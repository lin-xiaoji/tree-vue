<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="username">
            <Input type="text" v-model="formInline.username" placeholder="请输入帐号"/>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码" />
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
        </Form-item>
    </Form>

</template>
<script>
    import Api from '../utils/Api'
    import Cookie from '../utils/Cookie'
    export default {
        data () {
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        Api.post('login',this.$data.formInline, (data) =>{
                            this.$parent.$parent.loginModal = false;
                            this.$Message.success('登陆成功');
                            this.$store.commit('setUsername',data);
                        });
                    }
                });
            }
        }
    }
</script>
