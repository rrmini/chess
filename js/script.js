var size = 8;
var Black = '#555555'; // темные клетки
var White = '#dddddd'; // светлые клетки
var column = ['a','b','c','d','e','f','g','h'];
var chessboard = []; // массив объектов chessCell
var chess = ['b','h','k','p','q','r','n','j','l','o','w','t'];
var extremeRow = [0,1,2,3,4,5,6,7,8,15,16,23,24,31,32,39,40,
    47,48,55,56,57,58,59,60,61,62,63];
// chess[0-5] черные chess[6-11] белые или наоборот , посмотрим.
// возможно идея не очень. массив передается по ссылке. убъем одну
//фигуру - помрут все. посмотрим.

// наверное "прототип" клетки, содержит ряд колонку цвет фигуру
function ChessCell(row, column, bgColor, chess, id) {
    this.row = row; // 1-8
    this.column = column; // a - h column[0-7]
    this.bgColor = bgColor; // цвет клетки
    this.chess = ''; //фигура b-n,h-j,k-l,p-o,q-w,r-t
    this.id = id;
}
// схема распределения id
/*
* 0  1   2  3  4  5  6  7
* 8  9  10 11 12 13 14 15
* 16 17 18 19 20 21 22 23
* 24 25 26 27 28 29 30 31
* 32 33 34 35 36 37 38 39
* 40 41 42 43 44 45 46 47
* 48 49 50 51 52 53 54 55
* 56 57 58 59 60 61 62 63
* */

// инициализация массива слева на право сверху вниз

for ( y = 0; y < size; y++){
    for ( x = 0; x < size; x++){
        if ((x+y) % 2 == 0){
            chessboard.push(new ChessCell((size - y), column[x], White, '',
            x+(y*8)));
        }
        else {
            chessboard.push(new ChessCell((size - y), column[x], Black, '',
            x+(y*8)));
        }
    }
}
/*
* извлечение клетки (объекта) из массива по id
* */
// function getCell(id) {
//     for ( var index =0; index < 64; ++ index){
//         if(index == id) return ch
//     }
// }
// шахматная доска
//расстановка фигур

// chessboard[0].chess = chessboard[7].chess = 't';
// chessboard[1].chess = chessboard[6].chess = 'j';
// chessboard[2].chess = chessboard[5].chess = 'n';
// chessboard[3].chess = 'w';
// chessboard[4].chess = 'l';
//
// for(i = 8; i < 16; ++i){
//     chessboard[i].chess = 'o'; // черная пешка
// }
// for( i = 48; i < 56; ++i){
//     chessboard[i].chess = 'p'; // белая пешка
// }
// chessboard[56].chess = chessboard[63].chess = 'r';
// chessboard[57].chess = chessboard[62].chess = 'h';
// chessboard[58].chess = chessboard[61].chess = 'b';
// chessboard[59].chess = 'q';
// chessboard[60].chess = 'k';

// chessboard[11].chess = 'k';
chessboard[23].chess = 'q';
chessboard[42].chess = 'o';
chessboard[50].chess = 'o';
chessboard[51].chess = 'h';
chessboard[53].chess = 'h';
chessboard[58].chess = 'l';
chessboard[61].chess = 'k';

// отображение доски

var cellNumber = 0; //chessboard.length-1;
// в дальнейшем можно будет присвоить id
for ( y = 0; y < size; y++){
    document.write(size-y);
    for ( x = 0; x < size; x++){
        var str = '<div class="chessCell" style="background-color: ' +
            chessboard[cellNumber++].bgColor + '" id="'+
            chessboard[cellNumber-1].id + '">' +
            chessboard[cellNumber-1].chess +
            /*chessboard[cellNumber-1].row +*/ '</div>';
        document.write(str );
    }
    document.write(size-y + '<br>');
}

// отображение литеров a-h
str = '';
for(i=0;i<size;++i){
    str += '<div class="chessBoarder" >' + column[i] +
            '</div>';

}
document.write(" 0" + str);
// console.log(str);

// клик по клеткам
$(document).ready(function () {
    $(".chessCell").click(function () {
        var isActive = $(this).hasClass("active");
        var id = $(this).attr("id");
        $(".chessCell").removeClass("active available");
        // $(".chessCell").removeClass("available");
        if(!isActive) {
            $(this).addClass("active");
            availableCourse(chessboard[id].chess, id);
        }

        $(".info").text(chessboard[id].column + chessboard[id].row);

    });
});

/*
* обработка клавиатурных стрелок
* подсмотрел на Stack Overflow
* */
document.onkeydown = function myFunction() {
    var pos = $(".active").attr("id");
    switch (event.keyCode) {
        case 38:
            // console.log("Up key is pressed");
            // console.log(pos);
            pos = goUp(pos);
            $(".info").text(chessboard[pos].column  // duplicated jQuery selector наскольк это критично ?
                + chessboard[pos].row);
            break;
        case 40:
            // console.log("Down key is pressed");
            pos = goDown(pos);
            $(".info").text(chessboard[pos].column
                + chessboard[pos].row);
            break;
        case 39:
            // console.log("Right key is pressed");
            pos = goRight(pos);
            $(".info").text(chessboard[pos].column
                + chessboard[pos].row);
            break;
        case 37:
            // console.log("left key is pressed");
            pos = goLeft(pos);
            $(".info").text(chessboard[pos].column
                + chessboard[pos].row);
            break;
    }
};

function goUp(id) {
    var position = parseInt(id);
    (position-8)<0? position = position-8+64 :
        position=position-8;
    $(".chessCell").removeClass("active");
    $(".chessCell").removeClass("available");
    $("#"+position).addClass("active");
    availableCourse(chessboard[position].chess, position);
    return position;
}

function goDown(id) {
    var position = parseInt(id);
    ((position+8)> 63 ) ? position = position + 8 - 64 :
        position = position +8;
    $(".chessCell").removeClass("active");
    $(".chessCell").removeClass("available");
    $("#"+position).addClass("active");
    // console.log(position);
    // console.log(chessboard[position].chess);
    // if(chessboard[position].chess == undefined){
    //     chessboard[0].addClass('active');
    // }
    availableCourse(chessboard[position].chess, position);


    return position;

}

function goLeft(id) {
    var position = parseInt(id);
    position%8 ? position-- : position += 7;
    $(".chessCell").removeClass("active");
    $(".chessCell").removeClass("available");
    $("#"+position).addClass("active");
    availableCourse(chessboard[position].chess, position);
    return position;
}

function goRight(id) {
    var position = parseInt(id);
    (position+1) % 8 ? position++ : position -= 7;
    $(".chessCell").removeClass("active");
    $(".chessCell").removeClass("available");
    $("#"+position).addClass("active");
    availableCourse(chessboard[position].chess, position);
    return position;
}

// отображает возможные ходы для фигур
function availableCourse(chess, id) {
    var avCell = [];
    var pos = parseInt(id);
    switch (chess){
        case 'p' :
            avCell = pawnWhiteAvailable(pos);
            break;
        case 'o' :
            avCell = pawnBlackAvailable(pos);
            break;
        case 'h' :
            avCell = horseAvailable(pos, 'h');
            break;
        case  'j' :
            avCell = horseAvailable(pos, 'j');
            break;
        case 'b' :
            avCell = bishopAvailable(pos);
            break;
        case 'n' :
            avCell = bishopAvailable(pos);
            break;
        case 'r' :
            avCell = rookAvailable(pos);
            break;
        case 't' :
            avCell = rookAvailable(pos);
            break;
        case 'k' :
            avCell = kingAvailable(pos);
            break;
        case 'l' :
            avCell = kingAvailable(pos);
            break;
        case 'q' :
            avCell = queenAvailable(pos);
            break;
        case 'w' :
            avCell = queenAvailable(pos);
            break;
    }
    for (i = 0; i < avCell.length; ++i){
        $("#"+avCell[i]).addClass("available");
    }
}

// возвращает массив возможных ходов для белой пешки
function pawnWhiteAvailable(id) { 
    var pos = parseInt(id);
    var avPos = []; // массив возможных ходов
    
    if(!(pos%8)){  //крайняя левая позиция 'а'
        if (isCellEmpty(pos -8) === 0 ) avPos.push(pos-8);
        if (isCellEmpty(pos -7) === 2) avPos.push(pos-7);
        if (pos == 48 && (isCellEmpty(pos -16)  === 0 ) &&
            (isCellEmpty(pos -8) === 0 )) avPos.push(pos-16);
        return avPos;
    }
    
    if(!((pos+1)%8)){ //крайняя правая позиция
        if (isCellEmpty(pos -8) === 0 ) avPos.push(pos-8);
        if (isCellEmpty(pos -9) === 2) avPos.push(pos-9);
        if (pos == 55 && (isCellEmpty(pos -16)  === 0 ) &&
            (isCellEmpty(pos -8) === 0 )) avPos.push(pos-16);
        return avPos;
    }

    if (isCellEmpty(pos -8) === 0 ) avPos.push(pos-8);
    if (isCellEmpty(pos -7) === 2) avPos.push(pos-7);
    if (isCellEmpty(pos -9) === 2) avPos.push(pos-9);
    if ((48 < pos && pos < 55) && (isCellEmpty(pos -8) === 0) &&
        (isCellEmpty(pos -16) === 0 )) avPos.push(pos-16);
    return avPos;
}

// возвращает массив возможных ходов для черной пешки
function pawnBlackAvailable(id) {
    var pos = parseInt(id);
    var avPos = []; // массив возможных ходов

    if(!(pos%8)){  //крайняя левая позиция 'а'
        if (isCellEmpty(pos +8) === 0 ) avPos.push(pos+8);
        if (isCellEmpty(pos +9) === 1) avPos.push(pos+9);
        if (pos == 8 && (isCellEmpty(pos +16)  === 0 ) &&
            (isCellEmpty(pos +8) === 0 )) avPos.push(pos+16);
        return avPos;
    }

    if(!((pos+1)%8)){ //крайняя правая позиция
        if (isCellEmpty(pos + 8) === 0 ) avPos.push(pos + 8);
        if (isCellEmpty(pos + 7) === 1) avPos.push(pos + 7);
        if (pos == 15 && (isCellEmpty(pos + 16) === 0) &&
            (isCellEmpty(pos + 8) === 0)) avPos.push(pos + 16);
        return avPos;
    }

    if (isCellEmpty(pos + 8) === 0 ) avPos.push(pos + 8);
    if (isCellEmpty(pos + 7) === 1) avPos.push(pos + 7);
    if (isCellEmpty(pos + 9) === 1) avPos.push(pos + 9);
    if ((8 < pos && pos < 15) && (isCellEmpty(pos +8) === 0) &&
        (isCellEmpty(pos + 16) === 0)) avPos.push(pos + 16);
    return avPos;
}

// возвращает массив возможных ходов для коня
function horseAvailable(id, horse) {
    var avPos = [-17,-15,-10,-6,6,10,15,17];
    var pos = parseInt(id);
    var result = [];
    var colorHorse = (horse == 'h'); // true - белый false -черный
    if(!(pos%8)) { // крайний левый ряд a1 - a8
        removeItem(avPos, -17);
        removeItem(avPos, -10);
        removeItem(avPos, 6);
        removeItem(avPos, 15);
    }
    if(!((pos-1)%8)){ // второй слева b1 - b8
        removeItem(avPos, -10);
        removeItem(avPos, 6);
    }
    if (!((pos+1)%8)) { // крайний правый h1 - h8
        removeItem(avPos, -15);
        removeItem(avPos, -6);
        removeItem(avPos, 10);
        removeItem(avPos, 17);
    }
    if (!((pos+2)%8)) { // второй справа f1 - f8
        removeItem(avPos, -6);
        removeItem(avPos, 10);
    }
    if(-1 < pos && pos < 8){ // верхний ряд a8 - h8
        removeItem(avPos, -10);
        removeItem(avPos, -17);
        removeItem(avPos, -15);
        removeItem(avPos, -6);
    }
    if( 7 < pos && pos < 16){ // второй сверху a7 - h7
        removeItem(avPos, -17);
        removeItem(avPos, -15);
    }
    if(55 < pos && pos < 64){ // нижний ряд a1 - h1
        removeItem(avPos, 10);
        removeItem(avPos, 17);
        removeItem(avPos, 15);
        removeItem(avPos, 6);
    }
    if(47 < pos && pos < 56){ // второй снизу a2 - h2
        removeItem(avPos, 17);
        removeItem(avPos, 15);
    }
    if (colorHorse){
        for(i=0; i<avPos.length; ++i){
            if(isCellEmpty(pos + avPos[i]) == 1) continue;
            result.push(pos + avPos[i]);
        }
    }
    else {
        for (i=0; i<avPos.length; ++i){
            if(isCellEmpty(pos + avPos[i]) == 2) continue;
            result.push(pos + avPos[i]);
        }
    }
    return result;
}

// возвращает массив возможных ходов для слона
function bishopAvailable(id) {
    // -9 -7 +9 +7
    var avPos = [-9, -7, 9, 7]; // возможное направление движения слона
    var result = []; // массив возможных ходов
    var pos = parseInt(id);
    var bishopColor = isCellEmpty(pos); // цвет слона

    if(!(pos%8)) { // крайний левый ряд a1 - a8
        removeItem(avPos, -9);
        removeItem(avPos, 7);
    }
    if (!((pos+1)%8)) { // крайний правый h1 - h8
        removeItem(avPos, -7);
        removeItem(avPos, 9);
    }
    if(-1 < pos && pos < 8){ // верхний ряд a8 - h8
        removeItem(avPos, -9);
        removeItem(avPos, -7);
    }
    if(55 < pos && pos < 64){ // нижний ряд a1 - h1
        removeItem(avPos, 7);
        removeItem(avPos, 9);
    }
    for (i = 0 ; i < avPos.length; ++i){
        for(var j = 0; j < 8; ++j){
            if(isCellEmpty(pos + (j+1)*avPos[i]) == bishopColor) break; // клетка занята своей фигурой
            if(isCellEmpty(pos + (j+1)*avPos[i])) { // клетка занята чужой фигурой
                result.push(pos + (j+1)*avPos[i]);
                break; // выходим из цикла
            }
            result.push(pos + (j+1)*avPos[i]);
            if(!(false == include(extremeRow, (pos + (j+1)*avPos[i])))) break;
        }
    }
    return result;
}

// возвращает массив возможных ходов для ладьи
function rookAvailable(id) {
    // -8 -1 +1 +8
    var avPos = [-8, -1, 1, 8]; // возможное направление движения ладьи
    var result = []; // массив возможных ходов
    var pos = parseInt(id);
    var rookColor = isCellEmpty(pos); // цвет ладьи

    if(!(pos%8)) { // крайний левый ряд a1 - a8
        removeItem(avPos, -1);
    }
    if (!((pos+1)%8)) { // крайний правый h1 - h8
        removeItem(avPos, 1);
    }
    if(-1 < pos && pos < 8){ // верхний ряд a8 - h8
        removeItem(avPos, -8);
    }
    if(55 < pos && pos < 64){ // нижний ряд a1 - h1
        removeItem(avPos, 8);
    }
    for (i = 0 ; i < avPos.length; ++i){
        for(var j = 0; j < 8; ++j){
            if(isCellEmpty(pos + (j+1)*avPos[i]) == rookColor) break; // клетка занята своей фигурой
            if(isCellEmpty(pos + (j+1)*avPos[i])) { // клетка занята чужой фигурой
                result.push(pos + (j+1)*avPos[i]);
                break; // выходим из цикла
            }
            result.push(pos + (j+1)*avPos[i]); // клетка свободна
            if(!(false == include(extremeRow, (pos + (j+1)*avPos[i])))) break; // край доски
        }
    }
    return result;
}

// возвращает массив возможных ходов для короля
function kingAvailable(id) {
    // -9 -8 -7 -1 1 7 8 9
    var avPos = [-9, -8, -7, -1, 1, 7, 8, 9]; // возможное направление движения короля
    var result = []; // массив возможных ходов
    var pos = parseInt(id);
    var kingColor = isCellEmpty(pos); // цвет короля

    if(!(pos%8)) { // крайний левый ряд a1 - a8
        removeItem(avPos, -9);
        removeItem(avPos, -1);
        removeItem(avPos, 7);
    }
    if (!((pos+1)%8)) { // крайний правый h1 - h8
        removeItem(avPos, -7);
        removeItem(avPos, 1);
        removeItem(avPos, 9);
    }
    if(-1 < pos && pos < 8){ // верхний ряд a8 - h8
        removeItem(avPos, -9);
        removeItem(avPos, -8);
        removeItem(avPos, -7);
    }
    if(55 < pos && pos < 64){ // нижний ряд a1 - h1
        removeItem(avPos, 7);
        removeItem(avPos, 8);
        removeItem(avPos, 9);
    }
    for (i = 0 ; i < avPos.length; ++i){
        for(var j = 0; j < 1; ++j){
            if(isCellEmpty(pos + (j+1)*avPos[i]) == kingColor) break; // клетка занята своей фигурой
            if(isCellEmpty(pos + (j+1)*avPos[i])) { // клетка занята чужой фигурой
                result.push(pos + (j+1)*avPos[i]);
                break; // выходим из цикла
            }
            result.push(pos + (j+1)*avPos[i]); // клетка свободна
            if(!(false == include(extremeRow, (pos + (j+1)*avPos[i])))) break; // край доски
        }
    }
    return result;
}

// возвращает массив возможных ходов для ферзя
function queenAvailable(id) {
    // -9 -8 -7 -1 1 7 8 9
    var avPos = [-9, -8, -7, -1, 1, 7, 8, 9]; // возможное направление движения ферзя
    var result = []; // массив возможных ходов
    var pos = parseInt(id);
    var queenColor = isCellEmpty(pos); // цвет короля

    if(!(pos%8)) { // крайний левый ряд a1 - a8
        removeItem(avPos, -9);
        removeItem(avPos, -1);
        removeItem(avPos, 7);
    }
    if (!((pos+1)%8)) { // крайний правый h1 - h8
        removeItem(avPos, -7);
        removeItem(avPos, 1);
        removeItem(avPos, 9);
    }
    if(-1 < pos && pos < 8){ // верхний ряд a8 - h8
        removeItem(avPos, -9);
        removeItem(avPos, -8);
        removeItem(avPos, -7);
    }
    if(55 < pos && pos < 64){ // нижний ряд a1 - h1
        removeItem(avPos, 7);
        removeItem(avPos, 8);
        removeItem(avPos, 9);
    }
    for (i = 0 ; i < avPos.length; ++i){
        for(var j = 0; j < 8; ++j){
            if(isCellEmpty(pos + (j+1)*avPos[i]) == queenColor) break; // клетка занята своей фигурой
            if(isCellEmpty(pos + (j+1)*avPos[i])) { // клетка занята чужой фигурой
                result.push(pos + (j+1)*avPos[i]);
                break; // выходим из цикла
            }
            result.push(pos + (j+1)*avPos[i]); // клетка свободна
            if(!(false == include(extremeRow, (pos + (j+1)*avPos[i])))) break; // край доски
        }
    }
    return result;
}
//проверка клетки на наличие фигуры по id
function isCellEmpty(id) {
    var pos = parseInt(id);
    var result = include(chess, chessboard[pos].chess);
    if (false === result) return 0; //клетка пустая
    if (0 <= result && result <= 5) return 1; // белая фигура
    if (5 < result && result < 12) return 2 ; // черная фигура
    return undefined;
}


// проверка наличия объекта(элемента)obj в массиве arr
function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return i;
    }
    return false;
}
// удаление ненужного элемента obj из массива arr
function removeItem(arr, obj) {
    var index = arr.indexOf(obj);
    if (index == -1) return;
    arr.splice(index,1);
}

// кнопка старт расстановка фигур
$(document).ready(function () {
    $("#start").click(function () {
        for (i = 0; i < 64; ++i){
            chessboard[i].chess = '';
            $("#"+i).text(chessboard[i].chess);
        }
        $(".chessCell").removeClass("active");
        $(".chessCell").removeClass("available");
        chessboard[0].chess = chessboard[7].chess = 't';
        chessboard[1].chess = chessboard[6].chess = 'j';
        chessboard[2].chess = chessboard[5].chess = 'n';
        chessboard[3].chess = 'w';
        chessboard[4].chess = 'l';

        for(i = 8; i < 16; ++i){
            chessboard[i].chess = 'o'; // черная пешка
        }
        for( i = 48; i < 56; ++i){
            chessboard[i].chess = 'p'; // белая пешка
        }
        chessboard[56].chess = chessboard[63].chess = 'r';
        chessboard[57].chess = chessboard[62].chess = 'h';
        chessboard[58].chess = chessboard[61].chess = 'b';
        chessboard[59].chess = 'q';
        chessboard[60].chess = 'k';
        for(i = 0; i<64; ++i){
            $("#"+i).text(chessboard[i].chess);
        }
    });
});

// Остап закончил игру
$(document).ready(function () {
    $("#clean").click(function () {
        for (i = 0; i < 64; ++i){
            chessboard[i].chess = '';
            $("#"+i).text(chessboard[i].chess);
        }
        $(".chessCell").removeClass("active");
        $(".chessCell").removeClass("available");
    });
});