var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: function () {
        return {
            valid: true,
            state: {
                active: false,
                loader: false,
                text: ""
            },
            /* Se agrega la url del server */
            url_server: "",
            name: "",
            lastname: "",
            topic: "",

            items: ["op1", "op2"],

            phone: "",
            email: "",
            code: "",
            message: "",
            emailRules: [
                v => !!v || 'El correo es requerido',
                v => /.+@.+\..+/.test(v) || 'Correo no válido',
            ]
        }
    },
    methods: {
        async validate () {
            this.state.text = "Enviando mensaje..."
            this.state.active = true;
            this.state.loader = true;

            let data = this.getData();

            let response = await axios.post(this.url_server, data);

            if(response.data.code === 0) {
                this.state.text = "Mensaje enviado correctamente"
                this.state.loader = false;
                setTimeout(() => {
                    this.state.active = false;
                }, 2000);
                this.cleanData();
            } else {
                this.state.text = "No se pudo enviar el email"
                this.state.active = false;
                this.state.loader = false;
            }

            this.$refs.form.validate();
        },
        getData() {
            return {
                nombres: this.name,
                apellidos: this.lastname,
                asunto: this.topic,
                telefono: this.phone,
                correo: this.email,
                codigo: this.code,
                mensaje: this.message
            }
        },
        cleanData() {
            this.name = "";
            this.lastname = "";
            this.topic = "";
            this.phone = "";
            this.email = "";
            this.code = "";
            this.message = "";
        }
    }
})
Vue.use(Vuetify, {
    theme: {
        primary: '#C0D8D8',
        secondary: '#D8F0F0',
        accent: '#303030',
        error: '#F72A38',
        warning: '#F5E582',
        info: '#F0F0F0',
        success: '#789078'
    }
})