<template>
    <div class="header">
        <a id="btn-save" class="fr mr_20 btn" >
            保存
        </a>

        <!--登录之前-->
        <a id="btn-login" class="header-item tc fl ml_10" >
            <span class="iconfont font_14" style="margin-right:2px; margin-top:4px">&#xe678;</span>登录
        </a>
        <!-- <a id="btn-reg" class="header-item tc fl ml_10">
             <span class="iconfont font_14">&#xe637;</span>注册
         </a>-->
        <!--登录之后-->
        <div class="login" style="display:none">
            <span class="portrait iconfont font_14">&#xe64c;</span><span class="font_14 account">account</span>
        </div>

        <span id="file-name" class="tc font_16">加载中...</span>


    </div>
</template>
<script>

    export default {

    }
</script>