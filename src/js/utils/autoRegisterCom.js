import vue from "vue";

const dirMap = require.context("../../components/libs",true,/\.vue$/)

dirMap.keys().forEach(fileName => {
    
    let component = dirMap(fileName);
    let {default : template = component, default : {name = fileName.split("/").pop().replace(/\.\w+$/,'')} = {}}  = component;

    vue.component(name,template)
});
