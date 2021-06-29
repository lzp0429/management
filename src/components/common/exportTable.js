export function tableExcel(tab, title, tabname) {
    //要导出表格
    const jsonData = tab
        //这个是每列标题
    let str = title + '\n';
    for (let i = 0; i < jsonData.length; i++) {
        for (let item in jsonData[i]) {
            str += `${jsonData[i][item] + '\t'},`;
        }
        str += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    let diamonds = document.createElement("a");
    diamonds.href = uri;
    //对下载的文件命名
    diamonds.download = tabname + ".xls";
    document.body.appendChild(diamonds);
    diamonds.click();
    document.body.removeChild(diamonds);
}