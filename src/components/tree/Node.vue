<template>
    <span>
    <div class="node" :style="{left: (treeData.level * 200) + translateX +'px', top: treeData.posY + translateY - 25 +'px'}" :key="treeData.key">
        <span>{{treeData.name}}</span>
        <img src="assets/img/property.gif">
    </div>
    <template v-if="treeData.sub">
        <SubNode v-for="(item,index) in treeData.sub" :treeData="item" :key="item.key"></SubNode>
    </template>
    </span>
</template>
<script>
    export default {
        props:['treeData'],
        data() {
            return {
                translateX:300,
                translateY:6000,
            }
        },
        beforeCreate: function () {
            this.$options.components.SubNode = require('./Node.vue');
        }
    }
</script>
