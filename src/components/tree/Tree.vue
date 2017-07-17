<template>
    <div id="tree" :style="{height: '12000px',top : treeTop+'px',left: treeLeft + 'px'}" @mousedown="drag">
        <div id="properties">

        </div>
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
        "code": 1,
        "msg": "ok",
        "data": {
            "name": "本地存储",
            "content": "{\"id\":\"80\",\"file_id\":\"4\",\"parent_id\":\"0\",\"name\":\"\\u672c\\u5730\\u5b58\\u50a8\",\"level\":\"0\",\"height\":\"0\",\"posY\":\"0\",\"key\":\"key-80\",\"sub\":[{\"id\":\"81\",\"file_id\":\"4\",\"parent_id\":\"80\",\"name\":\"indexedDB\",\"level\":\"1\",\"height\":null,\"posY\":null,\"key\":\"key-81\",\"property\":[]},{\"id\":\"82\",\"file_id\":\"4\",\"parent_id\":\"80\",\"name\":\"sessionStorage\",\"level\":\"1\",\"height\":null,\"posY\":null,\"key\":\"key-82\",\"property\":[]},{\"id\":\"83\",\"file_id\":\"4\",\"parent_id\":\"80\",\"name\":\"localStorage\",\"level\":\"1\",\"height\":null,\"posY\":null,\"key\":\"key-83\",\"property\":[]},{\"id\":\"84\",\"file_id\":\"4\",\"parent_id\":\"80\",\"name\":\"webSQL\",\"level\":\"1\",\"height\":null,\"posY\":null,\"key\":\"key-84\",\"property\":[]},{\"id\":\"85\",\"file_id\":\"4\",\"parent_id\":\"80\",\"name\":\"Cookie\",\"level\":\"1\",\"height\":null,\"posY\":null,\"key\":\"key-85\",\"property\":[]}],\"property\":[]}"
        }
    };
    var treeData = JSON.parse(data.data.content);


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
            }
        },
        methods: {


            addNode() {
                //修改节点值

                //...

            },
            drag(e) {
                if(e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA') {
                    return ;
                }
                var treeX = e.clientX - this.treeLeft;
                var treeY = e.clientY - this.treeTop;

                document.onmousemove = function(e) {
                    var treeLeft = e.clientX - treeX;
                    var treeTop = e.clientY - treeY;


                    this.treeLeft = treeLeft + 'px';
                    this.treeLeft = treeTop + 'px';

                };
                document.onmouseup = function(e) {
                    this.onmousemove = null;
                    this.onmouseup = null;
                };
            }
        },
        created() {
            console.log(treeData);
            this.$store.commit('setTreeData',treeData);
        },
        components: {
            DetailBox,
            Node,
            JoinLine,
        }
    }
</script>