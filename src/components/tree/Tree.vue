<template>
    <div id="tree" :style="{height: '12000px',top : treeTop+'px',left: treeLeft + 'px'}" onselectstart="return false;" @mousedown="drag">
        <div id="nodes">
            <Node :treeData="treeData"></Node>
        </div>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" id="svg-box">
            <g id="tree-root" transform="translate( 300 6000 )">
                <g id="lines">
                    <JoinLine :treeData="treeData"></JoinLine>
                </g>
            </g>
        </svg>
        <DetailBox></DetailBox>
    </div>
</template>

<script>
    import DetailBox from './DetailBox.vue'
    import Node from './Node.vue'
    import JoinLine from './LinkLine.vue'
    var data = {
        "id": "80",
        "file_id": "4",
        "parent_id": "0",
        "name": "本地存储",
        "level": "0",
        "height": "0",
        "posY": "0",
        "key": "key-80",
        "sub": [
            {
                "id": "81",
                "file_id": "4",
                "parent_id": "80",
                "name": "indexedDB",
                "level": "1",
                "height": null,
                "posY": null,
                "key": "key-81",
                "property": []
            },
            {
                "id": "82",
                "file_id": "4",
                "parent_id": "80",
                "name": "sessionStorage",
                "level": "1",
                "height": null,
                "posY": null,
                "key": "key-82",
                "property": [
                    {
                        'key':'property-124',
                        "name":'deee',
                        "content":'content111',
                    }
                ]
            },
            {
                "id": "83",
                "file_id": "4",
                "parent_id": "80",
                "name": "localStorage",
                "level": "1",
                "height": null,
                "posY": null,
                "key": "key-83",
                "property": []
            },
            {
                "id": "84",
                "file_id": "4",
                "parent_id": "80",
                "name": "webSQL",
                "level": "1",
                "height": null,
                "posY": null,
                "key": "key-84",
                "property": [],
                'sub':[
                    {
                        "id": "85",
                        "file_id": "4",
                        "parent_id": "80",
                        "name": "Cookie",
                        "level": "1",
                        "height": null,
                        "posY": null,
                        "key": "key-85",
                        "property": []
                    }
                ]
            },
            {
                "id": "85",
                "file_id": "4",
                "parent_id": "80",
                "name": "Cookie",
                "level": "1",
                "height": null,
                "posY": null,
                "key": "key-85",
                "property": []
            }
        ],
        "property": []
    };
    //var treeData = JSON.parse(data.data.content);
    var treeData = data;

    export default {
        data() {
            return {
                treeTop: -(12000 - window.innerHeight)/2,
                treeLeft: 0
            }
        },
        computed: {
            treeData() {
                return this.$store.state.treeData;
            },
            currentNode() {
                return this.$store.state.currentNode;
            },
        },
        methods: {
            //添加兄弟节点
            addNode() {
                var newObject = {
                    name:'新节点',
                    posY: null,
                    key:'key-' + Math.random(),
                    property:[],
                };
                var index = 0;
                let currentNode = this.currentNode;
                for(var i=0; i<currentNode.parent.sub.length; i++ ) {
                    if(currentNode.parent.sub[i] == currentNode) {
                        index = i + 1;
                    }
                }
                currentNode.parent.sub.splice(index,0,newObject);
                this.$store.commit('setCurrentNode',newObject);

                let treeData = this.treeData;
                this.$store.commit('setTreeData',treeData);
            },
            //添加子节点
            addSubNode() {
                var newObject = {
                    name:'新节点',
                    property:[],
                    key:'key-' + Math.random()
                };
                let currentNode = this.currentNode;
                if(!currentNode.sub) {
                    this.$set(currentNode, 'sub', []);
                }
                currentNode.sub.push(newObject);
                this.$store.commit('setCurrentNode',newObject);

                let treeData = this.treeData;
                this.$store.commit('setTreeData',treeData);
            },

            //拖拽
            drag(e) {
                if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') {
                    return ;
                }
                var treeX = e.clientX - this.treeLeft;
                var treeY = e.clientY - this.treeTop;

                document.onmousemove = (e) =>{
                    this.treeLeft = e.clientX - treeX;
                    this.treeTop = e.clientY - treeY;
                };
                document.onmouseup = function(e) {
                    this.onmousemove = null;
                    this.onmouseup = null;
                };
            }
        },
        created() {
            this.$store.commit('setTreeData',treeData);
            this.$store.commit('setCurrentNode',treeData);
        },
        mounted() {
            window.onkeyup = (e)=> {
                if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') {
                    return ;
                }
                //添加子节点 enter
                if(e.keyCode == 13 && e.shiftKey == false ) {
                    this.addNode();
                }

                if(e.keyCode == 13 && e.shiftKey == true ) {
                    this.addSubNode();
                }
            };
        },
        components: {
            DetailBox,
            Node,
            JoinLine,
        }
    }
</script>