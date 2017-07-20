<template>
    <span>
    <div :class="nodeClass"
         :style="{left: (treeData.level * 200) + translateX +'px', top: treeData.posY + translateY - 25 +'px'}"
         :key="treeData.key"
         @click="selectNode"
         @dblclick="editNode"
         ref="nodeName"
    >
        <span v-show="onEdit"><input :value="treeData.name" :style="{width: inputWidth + 'px'}" @blur="cancelEditNode" ref="input" /></span>
        <span v-show="!onEdit">{{treeData.name}}</span>
        <img src="assets/img/property.gif" @click="toggleProperty">
        <div class="property" v-show="propertyShow">
            <ul>
               <li v-for="item in treeData.property"><a><span class="img_1"></span>{{item.name}} </a></li>

               <li data-tag="add"> <a class="add">添加属性</a> </li>
            </ul>
        </div>
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
                onEdit:false,
                inputWidth:100
            }
        },
        computed: {
            nodeClass() {
                return {
                    node:true,
                    'current-node': (this.treeData == this.$store.state.currentNode)
                }
            },
            propertyShow() {
                return this.treeData.key == this.$store.state.showPropertyKey
            }
        },
        beforeCreate: function () {
            this.$options.components.SubNode = require('./Node.vue');
        },
        methods: {
            selectNode() {
                this.$store.commit('setCurrentNode',this.treeData);
            },
            editNode() {
                this.inputWidth = this.$refs.nodeName.offsetWidth - 50;
                this.onEdit = true;
            },
            cancelEditNode(e) {
                this.onEdit = false;
                let currentNode = this.$store.state.currentNode;
                currentNode.name = e.currentTarget.value;
                let treeData = this.$store.state.treeData;
                this.$store.commit('setTreeData',treeData);
            },
            toggleProperty() {
                if (this.propertyShow) {
                    this.$store.commit('setShowPropertyKey','');
                } else  {
                    this.$store.commit('setShowPropertyKey',this.treeData.key);
                }
            }
        },
        updated() {
            if(this.$refs.input) {
                this.$refs.input.focus();
                this.$refs.input.select();
            }
        }
    }
</script>
