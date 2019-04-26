import index from "../components/index.vue";
import "@/js/utils/autoRegisterCom.js";
import vue from "vue"

new vue({
    el : "#app",
    render : c => c(index),
    created(){
        console.log(process.env.NODE_ENV)
    }
    // template : "<div>31124124</div>"
    // render : h =>  h("div",{
    //     domProps : {
    //         innerHTML : 12312
    //     }
    // }),
})
console.log("index")