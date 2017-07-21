<template>
    <div id="root">
        <TopBar></TopBar>
        <LeftBar></LeftBar>
        <Tree></Tree>
    </div>
</template>

<script>
import Api from './utils/Api'
import TopBar from './components/TopBar.vue'
import LeftBar from './components/LeftBar.vue'
import Tree from './components/tree/Tree.vue'

export default {
    data() {
        return {
            message: 'Hello Vue!'
          }
    },
    mounted() {

    },
    components: {
        TopBar,
        LeftBar,
        Tree,
    }
}
</script>