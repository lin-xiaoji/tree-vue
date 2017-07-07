<template>
    <span>
    <div class="node" :style="{left: (treeData.level * 200)+'px', top: treeData.posY+'px'}" :key="treeData.key">
        <span>{{treeData.name}}</span>
        <img src="asset/img/property.gif">
    </div>
    <template v-if="treeData.sub">
        <SubNode v-for="(item,index) in treeData.sub" :treeData="item" :key="item.key"></SubNode>
    </template>
    </span>
</template>
<script>
    export default {
        props:['treeData'],
        beforeCreate: function () {
            this.$options.components.SubNode = require('./Node.vue');
        }
    }
</script>
