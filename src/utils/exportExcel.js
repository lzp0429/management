import axios from 'axios'

// 导出Excel公用方法
export function exportMethod(data) {
    axios({
        method: data.method,
        url: 'http://192.168.0.40:8090'+data.url,
        data:data.params,
        responseType: 'blob'
    }).then((res) => {
        console.log("请求数据",res)
        const link = document.createElement('a')
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
 
        // link.download = res.headers['content-disposition'] //下载后文件名
        // link.download = data.fileName //下载的文件名
        link.setAttribute("download", data.fileName + ".xls");
        link.click()
        document.body.appendChild(link)
       
        document.body.removeChild(link)
    }).catch(error => {
        console.log(error)
        this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
        })
        console.log(error)
    })
}