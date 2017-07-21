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
        <div id="overlayDivArrow" class="baby_overlay_arrow" style="top:160px;"></div>
    </div>
</template>
<script>
    import Api from '../../utils/Api'
    export default {
        data() {
            return {
                top:6000,
                left:545
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
                Api.post('file/save',{content:treeData},function () {

                })
            },
            close() {
                this.$store.commit('setDetailShow',false);
            }
        },
        mounted() {
            this.$watch('detailData', (val, oldVal) => {
                let currentNode = this.$store.state.currentNode;

                this.top = 6000 - 200 + currentNode.posY + this.detailData.index * 36;
                this.left = currentNode.level * 200 + 540;

                let treeTop = this.$root.$children[0].$children[2].treeTop;
                let offsetTop = 6000 + treeTop - window.innerHeight/2;
                console.log(offsetTop);

                let toTop = 0; //相对屏幕的顶部距离


            })
        }
    }
</script>