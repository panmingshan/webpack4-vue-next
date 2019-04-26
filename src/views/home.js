import index from "../components/home.vue";
import "@/js/utils/autoRegisterCom.js";
import vue from "vue"

new vue({
    el : "#app",
    render : c => c(index)
    // template : "<div>31124124</div>"
    // render : h =>  h("div",{
    //     domProps : {
    //         innerHTML : 12312
    //     }
    // }),
})
console.log("home")