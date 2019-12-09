// import Vue from "vue/types/vue";

var MD5 = require('./md5.js');
const CryptoJS = require('crypto-js');
import { JSEncrypt } from 'jsencrypt'

import Vue from 'vue';
import router from "../router";
const vue = new Vue({

    router
});
/*
 * 自定义公共函数 
 */
function tt() {
    console.log('test');
}

// 获取当前时间戳
function getTimeStampTmp() {
    var timestamp = (new Date()).getTime();
    return timestamp;
}


function formatDate(now) { 
    var d = new Date(now);
    var year=d.getFullYear();  //取得4位数的年份
    var month=d.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date=d.getDate();      //返回日期月份中的天数（1到31）
    var hour=d.getHours();     //返回日期中的小时数（0到23）
    var minute=d.getMinutes(); //返回日期中的分钟数（0到59）
    var second=d.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}

function getMd5(timeStampTmp) {
    var md5 = MD5.hex_md5(timeStampTmp + "ZTXWEIXINV006");
    return md5;
}

function getIp() {
    var url = '192.168.0.1';
    return url;
}

function decodegTool(aesKey, aesData) {

    let jse = new JSEncrypt();

    // 设置rsa私钥
    jse.setPrivateKey("MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAkl1OjPfH36a1Yma6Y4K1oTgXuroPOW9AtY2v5Q8nu8FKBUP5dUEGQnNuCw2+GhkLgypw9ucAOLbGky7aea4XiwIDAQABAkBpPhaBXpmlw6WhP+S+MPqRFlhZt/fCgLCy21KjDiav5cqRj6UBvS9ZjL1u/MqSrwX2nQs22BHfFj2n9BjdoJCBAiEA8+CAlF7R0WJoLQP4pFRUCCkRlUam8iDkvQj/RGUkiBECIQCZo+SVjz2ifNixrU3Zx+Pz9VG3I67wWXG0Xk2+Lyuh2wIhAL9GIHK+H6Ayp3RO/g+c2D+CPnku7bdQFzcwPE2falSRAiBoN5MrnDF70eIPi/Yd/whyiHq4ltzorlOBvOJRWp/nNwIgONgeUzLDlYfWn287YE4ZKc6MIi0/21T+Pejl6KL2VbU=\n")
    //解密出aes密钥
    let decryptedKey = jse.decrypt(aesKey);
    // 删除aesData中的换行符（\n）
    aesData = aesData.replace(/\n/g, '');
    let decrypt = CryptoJS.AES.decrypt(aesData, CryptoJS.enc.Utf8.parse(decryptedKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(decrypt);
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();

}
function limitFileSize (file, limitSize) {
    var that = this;
    var arr = ["KB", "MB", "GB"]
    var limit = limitSize.toUpperCase();
    var limitNum = 0;
    for (var i = 0; i < arr.length; i++) {
        var leval = limit.indexOf(arr[i]);
        if (leval > -1) {
            limitNum = parseInt(limit.substr(0, leval)) * Math.pow(1024, (i + 1))
            break
        }
    }
    if (file.size > limitNum) {
        console.log("文件偏大")
        vue.$message({
            showClose: true,
            message: '图片最大支持上传1MB',
            type: 'error'
        })
        return false;
    }
    return true
}
function encode(str){
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
};
export default {
    tt: tt,
    getTimeStampTmp: getTimeStampTmp,
    getMd5: getMd5,
    getIp: getIp,
    decodegTool: decodegTool,
    limitFileSize:limitFileSize,
    encode:encode,
    formatDate:formatDate
}
