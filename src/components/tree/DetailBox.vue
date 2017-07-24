<template>
    <div v-show="detailIsShow" class="baby_overlay" :style="{top: top + 'px', left: left + 'px'}">
        <div class="content round clearfix" style="height: 500px;">
            <a class="close" @click="close"></a>
            <div  class="details">
                <div class="apiDetail" v-show="!detailIsEdit">
                    <div class="biaoti">
                        <div class="property-edit" @click="toggleEdit">编辑</div>
                        <h2>{{detailData.name}}</h2>
                    </div>
                    <div class="desc">{{detailData.content}}</div>
                </div>
                <div class="apiDetail" v-show="detailIsEdit">
                    <div class="biaoti">
                        <div class="property-edit" @click="toggleEdit">预览</div>
                        <h2><input v-model="detailData.name" /></h2>
                    </div>
                    <div>
                        <textarea class="input_z" v-model="detailData.content"></textarea>
                    </div>
                    <button @click="save">保存</button>
                </div>
            </div>
        </div>
        <div id="overlayDivArrow" class="baby_overlay_arrow" :style="{top: arrowTop + 'px'}"></div>
    </div>
</template>
<script>
    import Api from '../../utils/Api'
    export default {
        data() {
            return {
                top:0,
                left:0,
                arrowTop:0
            }
        },
        computed: {
            detailIsShow() {
                return this.$store.state.detailIsShow;
            },
            detailIsEdit() {
                return this.$store.state.detailIsEdit;
            },
            detailData() {
                return this.$store.state.detailData;
            }
        },
        methods: {
            toggleEdit() {
                this.$store.commit('setDetailEdit',!this.detailIsEdit);
            },
            save() {
                this.$store.commit('setDetailEdit',false);
                let treeData = this.$parent.treeData;
                this.$store.commit('setTreeData',treeData);
                Api.post('files/saveProperty',this.detailData,function (data) {
                    this.detailData.id = data.id
                })
            },
            close() {
                this.$store.commit('setDetailShow',false);
            }
        },
        mounted() {
            this.$watch('detailData', (val, oldVal) => {
                let currentNode = this.$store.state.currentNode;

                let toTop = currentNode.posY + this.detailData.index * 36 - 250 + window.innerHeight/2; //相对屏幕的顶部距离
                //不超出屏幕最顶和最底部
                if(toTop < 0) toTop = 0;
                if((toTop + 500) > window.innerHeight) toTop = window.innerHeight - 500;

                let treeTop = this.$root.$children[0].$children[2].treeTop;//整个树的顶部相对位置
                let offsetTop = 6000 + treeTop - window.innerHeight/2; //拖动的距离

                this.top = toTop - treeTop;

                this.left = currentNode.level * 200 + 540;

                this.arrowTop = parseInt(currentNode.posY) + (this.detailData.index * 36) + window.innerHeight/2 + 36 - toTop + offsetTop;
            })
        }
    }
</script>