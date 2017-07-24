<template>
    <div class="property" v-show="show">
        <ul>
            <li v-for="(item,index) in propertyArr" @click="showDetail(index)"><a><span class="img_1"></span>{{item.name}} </a></li>

            <li @click="addProperty"> <a class="add">添加属性</a> </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:['property','show','nodeId'],
        data() {
            return {
                propertyArr: this.property
            }
        },
        methods: {
            showDetail(index) {
                let detailData = this.propertyArr[index];
                detailData.index = index;
                this.$store.commit('showDetail',this.propertyArr[index]);
            },
            addProperty() {
                this.propertyArr.push({
                    node_id:this.nodeId,
                    name:'',
                    content:''
                });
                this.showDetail(this.propertyArr.length-1);
                this.$store.commit('setDetailEdit',true);
            }
        }
    }
</script>