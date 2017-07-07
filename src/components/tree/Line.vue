<template>
    <path stroke="#73a1bf" stroke-width="2" fill="none" :d="'M'+ posX +' '+ posY +' L'+ (posX-50) +' '+ posY +' L'+ (posX-50) +' '+ parentY +' L'+ (posX-200) +' '+ parentY +''"></path>
    <template v-if="treeData.sub">
        <SubLine v-for="(item,index) in treeData.sub" :treeData="item" :key="item.key"></SubLine>
    </template>
</template>
<script>
    export default {
        props:['treeData'],
        computed: {
            posX() {
                return this.treeData.level * 200;
            },
            posY() {
                return this.treeData.posY;
            },
            parentY() {
                return this.treeData.parentY;
            },
        },
        beforeCreate: function () {
            this.$options.components.SubLine = require('./Line.vue');
        }
    }
</script>
