//金钱精度，分转元


export const regFenToYuan = (fen) => {
    var num = fen;
    num = fen * 0.01;
    num += '';
    var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
    num = toDecimal2(num.replace(reg, '$1'));
    return num
};

export const toDecimal2 = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

//数组去重,注意，一维数组
export const repect = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

//for循环数据替换.arr=数组，prop=数组第i个的属性名，a对比数据，b替换数据,c=else替换数据,注意-只适用于两种情况的替换，比如性别
export const forif = (arr, prop, a, b, c) => {
    // console.log(arr, prop, a, b, c)
    for (var i = 0; i < arr.length; i++) {
        // console.log(arr[i].prp)
        if (arr[i][prop] == a) {
            arr[i][prop] = b
        } else {
            arr[i][prop] = c
        }
    }
    return arr
}