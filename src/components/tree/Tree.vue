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
            //this.$store.commit('setTreeData',treeData);
            //this.$store.commit('setCurrentNode',treeData);
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