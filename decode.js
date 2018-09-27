var button_decode = document.getElementById('decode_start');
var decode_content = document.getElementById('de_content');

button_decode.onclick = function () {
    decode_content.innerHTML = decode(document.getElementById('input_text').value,document.getElementById('input_key').value);
}

var IP_table = new Array(
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
);
var Inverse_IP_table = new Array(
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25
);
var Extend_table = new Array(
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1
);
var Shrink_table_1 = (
    57, 49, 41, 33, 25, 17, 9,
        1, 58, 50, 42, 34, 26, 18,
        10, 2, 59, 51, 43, 35, 27,
        19, 11, 3, 60, 52, 44, 36,
        63, 55, 47, 39, 31, 23, 15,
        7, 62, 54, 46, 38, 30, 22,
        14, 6, 61, 53, 45, 37, 29,
        21, 13, 5, 28, 20, 12, 4
);
var Shrink_table_2 = (
    14, 17, 11, 24, 1, 5,
        3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8,
        16, 7, 27, 20, 13, 2,
        41, 52, 31, 37, 47, 55,
        30, 40, 51, 45, 33, 48,
        44, 49, 39, 56, 34, 53,
        46, 42, 50, 36, 29, 32
);
var s1 = (
    14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
        0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
        4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
        15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
);
var s2 = (
    15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
        3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
        0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
        13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
);
var s3 = (
        10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
            13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 4, 12, 11, 15, 1,
            13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
            1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
    )
;
var s4 = (
    7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
        13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
        10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
        3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
);
var s5 = (
    2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
        14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
        4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
        11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
);
var s6 = (
    12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
        10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
        9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
        4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
);
var s7 = (
    4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
        13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
        1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
        6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
);
var s8 = (
    13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
        1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
        7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
        2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
);
var s = (s1, s2, s3, s4, s5, s6, s7, s8);
var p_table = (
    16, 7, 20, 21,
        29, 12, 28, 17,
        1, 15, 23, 26,
        5, 18, 31, 10,
        2, 8, 24, 14,
        32, 27, 3, 9,
        19, 13, 30, 6,
        22, 11, 4, 25
);
var remove_key = (1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1);

function eight_bit(bit) {
    while (bit.length < 8) {
        bit = "0" + bit;
    }
    return bit;
}

function bin_to_bit(bin) {
    var bits = new Array();
    var i;
    for (i = 8; i > 0; i--) {
        bits.push(bin[bin.length - i]);
    }
    return bits;
}

function ascii_to_bit(text, length) {
    var n;
    var output = new Array();
    for (n = 0; n < length; n++) {
        //output.push(eight_bit(text.charCodeAt(n).toString(2)));
        var bin = eight_bit(text.charCodeAt(n).toString(2));
        //console.log(bin);
        output.push(bin_to_bit(bin));
        //console.log(text.charCodeAt(n).toString(2));
        //console.log(output[0][output[0].length-1]);
    }
    return output;
}

//console.log(ascii_to_bit('rt', 2));

var bit = ascii_to_bit('rt', 2);
//console.log(bit[0]);

//var num = 100;


function bit_to_ascii(array) {
    var num = 0;
    var n;
    for (n = 0; n < 8; n++) {
        if (array[n] == '1') {
            num += Math.pow(2, 7 - n);
            console.log(num);
        }
    }
    return String.fromCharCode(num);
}

//console.log(bit_to_ascii(bit[0]));

function create_keys(input_key) {
    var key_result = new Array();
    var key_in_bit = ascii_to_bit(input_key, input_key.length);
    var key_0 = new Array();
    var key_1 = new Array();
    var n = 0;
    while (n < 56) {
        key_0.push(0);
        n++;
    }
    n = 0;
    while (n < 48) {
        key_1.push(0);
        n++;
    }
    n = 0;
    while (n < 56) {
        key_0[n] = key_in_bit[Shrink_table_1[n] - 1];
    }
    var i = 0;
    var move_step = 0;
    while (i < 16) {
        if (i == 0 || i == 1 || i == 8 || i == 15) {
            move_step = 1;
        } else {
            move_step = 2;
        }

        var j;
        for (j = 0; j < move_step; j++) {
            var k;
            var temp = 0;
            for (k = 0; k < 8; k++) {
                temp = key_0[k * 7];
                var m;
                for (m = 7 * K; m < 7 * k + 7; m++) {
                    key_0[m] = key_0[m + 1];
                }
                key_0[7 * k + 6] = temp;
            }
            temp = key_0[0];
            for (k = 0; k < 28; k++) {
                key_0[k] = key_0[k + 1];
            }
            key_0[27] = temp;
            temp = key_0[28];
            for (k = 28; k < 56; k++) {
                key_0[k] = key_0[k + 1];
            }
            key_0[55] = temp;
        }
        i++;
    }

    for (j = 0; j < 48; j++) {
        key_1[j] = key_0[Shrink_table_2[j] - 1];
    }
    key_result = key_1;
    return key_result;
}

function decode(text, key) {
    var real_key = create_keys(key);
    var final_text_in_bit = new Array();
    var final_text_in_ascii = new Array();
    var n = 0;
    while (n < 64) {
        final_text_in_bit.push(0);
        n++;
    }
    n = 0;
    while (n < 8) {
        final_text_in_ascii.push(0);
        n++;
    }
    n = 0;

    var tempText = new Array();
    while (n<64){
        tempText.push(0);
        n++
    }
    n = 0;
    var extendR = new Array();
    while (n<48){
        extendR.push(0);
        n++;
    }
    n = 0;

    var bit_code = ascii_to_bit(text, text.length);

    var init = new Array();
    while (n<64){
        init.push(0);
        n++;
    }
    n=0;
    for(n = 0;n<64;n++){
        init[n] = bit_code[IP_table[n]-1];
    }
    var L = new Array();
    for(n = 0; n<32; n++){
        L.push(init[n]);
    }
    var R = new Array();
    for (n = 32; n<64; n++){
        R.push(init[n]);
    }

    for (n = 15; n>-1; n--){
        var tempR = R;
        var j;
        for(j=0;j<48;j++){
            extendR[j] = R[Extend_table[j]-1];
        }
        var keyi=new Array();
        j = n*48;
        while(j<n*48+48){
            keyi=real_key[j];
            j++;
        }
        var XORResult = new Array();
        j = 0;
        while (j<48){
            XORResult.push(0);
            j++;
        }
        for (j=0;j<48;j++){
            if(keyi[j]!=extendR[j]){
                XORResult[j]=1;
            }
        }
        var SResult = new Array();
        j = 0;
        while (j<32){
            SResult.push(0);
            j++;
        }
        var k = 0;
        for(k=0;k<8;k++){
            var row=XORResult[k*6]*2+XORResult[k*6+5];
            var column=XORResult[k*6+1]*8+XORResult[k*6+2]*4+XORResult[k*6+3]*2+XORResult[k*6+4];
            var temp =s[k][row*16+column];
            var m = 0;
            for(m=0;m<4;m++){
                SResult[4*k+m] = (temp>>m)&1;
            }
        }
        //p table exchange
        k = 0;
        var PResult = new Array();
        for(k=0;k<32;k++){
            PResult.push(0);
        }
        while(k<32){
            PResult[k] = SResult[p_table[k]-1];
            k++;
        }

        //left part
        k = 0;
        var XORWithL = new Array();
        for(k=0;k<32;k++){
            XORWithL.push(0);
        }
        while (k<32){
            if (L[k]!=PResult[k]){
                XORWithL[k]=1
            }
            k++;
        }
        //
        L=tempR;
        R=XORWithL;

        var temp_for_change = L;

        L=R;
        R = temp_for_change;

        tempText = L;
        tempText += R;

        k = 0;
        for(k=0;k<64;k++){
            final_text_in_bit[k]=tempText[Inverse_IP_table[k]-1];
        }
        final_text_in_ascii = bit_to_ascii(final_text_in_bit,final_text_in_bit.length);
        return final_text_in_ascii;

    }


}