
function findNextMovement() {
    var returnedCol = 0; 
    var tmpRow;
    var tmpCol;
    var stillSearching = true;
        
    /* Kontrollimi nese levizja e radhes mund te jete fituese */
    for (var k=0 ; k<currentIndexOfCol.length ; k++){
        tmpRow = currentIndexOfCol[k];
        if (tmpRow<6){ // Col in not full
            array[tmpRow][k] = (role%2)+1; 
            if (isAWinningMove(tmpRow, k)){
                array[tmpRow][k] = 0;
                stillSearching = false;
                returnedCol = k;
                k=100; 
                break;
            }
            else{
                array[tmpRow][k] = 0;
            }
        }
    }

    /* Bllokimi i levizjes se kundershtarit nese shihet se mund te jete fituese */
    if (stillSearching){
        for (var k=0 ; k<currentIndexOfCol.length ; k++){
            tmpRow = currentIndexOfCol[k];
            if (tmpRow<6){ // Col in not full
                array[tmpRow][k] = ((role+1)%2)+1; 
                if (isAWinningMove(tmpRow, k)){
                    array[tmpRow][k] = 0;
                    stillSearching = false;
                    returnedCol = k;
                    k=100; 
                    break;
                }
                else{
                    array[tmpRow][k] = 0;
                }
            }
        }
    }

    /* Levizje random */
    var index = 0; 
    if (stillSearching){
        var loop = true;
        while (loop){ 
            tmpCol = Math.floor((Math.random()*7));
            tmpRow = parseInt(currentIndexOfCol[tmpCol]);
            if (tmpRow<6){
                if ((tmpRow+1) < 6){
                    if (thereIsAPossibility()){
                        array[tmpRow][tmpCol] = (role%2)+1; 
                        array[1+tmpRow][tmpCol] = (((role+1)%2)+1); 
                        if (isAWinningMove(1+tmpRow, tmpCol) == (((role+1)%2)+1) ){ // nese kundershtari mund te fitoje
                            
                        }
                        else{
                            loop = false;
                        }
                        array[tmpRow][tmpCol] = 0;
                        array[1+tmpRow][tmpCol] = 0;
                        index++;
                    }
                    else{ 
                        loop = false;
                    }
                }
                else{
                    loop = false;
                }
            }
        }
        stillSearching = false;
        returnedCol = tmpCol;
    }
    
    return (returnedCol);
}

function thereIsAPossibility(){
    var r;
    var thereIsAPossibilityVariable = false;
    for (var c=0 ; c < columns ; c++){
        r = parseInt(currentIndexOfCol[c]) ;
        if (r<6){
            if ((r+1) <6){ 
                array[r][c] = (role%2)+1; 
                array[1+r][c] = (((role+1)%2)+1); 
                
                if (!(isAWinningMove(1+r, c) == (((role+1)%2)+1) ))
                    thereIsAPossibilityVariable = true;
                
                array[r][c] = 0;
                array[1+r][c] = 0;
            }
            else {
                thereIsAPossibilityVariable = true;
            }
        }
    }
    return thereIsAPossibilityVariable;
}


function isAWinningMove(row, col) {
    row = parseInt(row);
    col = parseInt(col);
        
    /* Kontrollo vertikalisht */
    if (accessArray(row, col) == accessArray(row-1, col)
        && accessArray(row-1, col) == accessArray(row-2, col) 
        && accessArray(row-2, col) == accessArray(row-3, col))
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+col, (row-2)+""+col, (row-3)+""+col);
        return accessArray(row, col);
    }
    
    /* Kontrollo horizontalisht */
    if (  accessArray(row, col)   == accessArray(row, col-1)
        && accessArray(row, col-1) == accessArray(row, col-2) 
        && accessArray(row, col-2) == accessArray(row, col-3) )
    {
        winningMoveCells = new Array(row+""+col, row+""+(col-1), (row)+""+(col-2), (row)+""+(col-3));
        return accessArray(row, col);
    }
    if  (  accessArray(row, col+1) == accessArray(row, col)
        && accessArray(row, col)   == accessArray(row, col-1) 
        && accessArray(row, col-1) == accessArray(row, col-2))
    {
        winningMoveCells = new Array(row+""+(col+1), row+""+(col), (row)+""+(col-1), (row)+""+(col-2));
        return accessArray(row, col);
    }
    if  (  accessArray(row, col+2) == accessArray(row, col+1)
        && accessArray(row, col+1) == accessArray(row, col) 
        && accessArray(row, col)   == accessArray(row, col-1))
    {
        winningMoveCells = new Array(row+""+(col+1), row+""+(col), (row)+""+(col-1), (row)+""+(col+2));
        return accessArray(row, col);
    }
    if  (  accessArray(row, col+3) == accessArray(row, col+2)
        && accessArray(row, col+2) == accessArray(row, col+1) 
        && accessArray(row, col+1) == accessArray(row, col) )     
    {
        winningMoveCells = new Array(row+""+(col+1), row+""+(col), (row)+""+(col+3), (row)+""+(col+2));
        return accessArray(row, col);
    }
    
    /* Kontrollo ne menyre diagonale (djathtas) */
    if  (  accessArray(row, col)     == accessArray(row-1, col-1)
        && accessArray(row-1, col-1) == accessArray(row-2, col-2) 
        && accessArray(row-2, col-2) == accessArray(row-3, col-3) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col-1), (row-2)+""+(col-2), (row-3)+""+(col-3));
        return accessArray(row, col);
    }
    if  (  accessArray(row+1, col+1) == accessArray(row, col)
        && accessArray(row, col)     == accessArray(row-1, col-1) 
        && accessArray(row-1, col-1) == accessArray(row-2, col-2) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col-1), (row-2)+""+(col-2), (row+1)+""+(col+1));
        return accessArray(row, col);
    }
    if  (  accessArray(row+2, col+2) == accessArray(row+1, col+1)
        && accessArray(row+1, col+1) == accessArray(row, col) 
        && accessArray(row, col)     == accessArray(row-1, col-1) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col-1), (row+2)+""+(col+2), (row+1)+""+(col+1));
        return accessArray(row, col);
    }
    if  (  accessArray(row+3, col+3) == accessArray(row+2, col+2)
        && accessArray(row+2, col+2) == accessArray(row+1, col+1) 
        && accessArray(row+1, col+1) == accessArray(row, col) )
    {
        winningMoveCells = new Array(row+""+col, (row+3)+""+(col+3), (row+2)+""+(col+2), (row+1)+""+(col+1));
        return accessArray(row, col);
    }
    
    /* Kontrollo ne menyre diagonale (majtas) */
    if  (  accessArray(row, col)     == accessArray(row-1, col+1)
        && accessArray(row-1, col+1) == accessArray(row-2, col+2) 
        && accessArray(row-2, col+2) == accessArray(row-3, col+3) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col+1), (row-2)+""+(col+2), (row-3)+""+(col+3));
        return accessArray(row, col);
    }
    if  (  accessArray(row+1, col-1) == accessArray(row, col)
        && accessArray(row, col)     == accessArray(row-1, col+1) 
        && accessArray(row-1, col+1) == accessArray(row-2, col+2) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col+1), (row-2)+""+(col+2), (row+1)+""+(col-1));
        return accessArray(row, col);
    }
    if  (  accessArray(row+2, col-2) == accessArray(row+1, col-1)
        && accessArray(row+1, col-1) == accessArray(row, col) 
        && accessArray(row, col)     == accessArray(row-1, col+1) )
    {
        winningMoveCells = new Array(row+""+col, (row-1)+""+(col+1), (row+2)+""+(col-2), (row+1)+""+(col-1));
        return accessArray(row, col);
    }
    if  (  accessArray(row+3, col-3) == accessArray(row+2, col-2)
        && accessArray(row+2, col-2) == accessArray(row+1, col-1) 
        && accessArray(row+1, col-1) == accessArray(row, col) )     
    {
        winningMoveCells = new Array(row+""+col, (row+3)+""+(col-3), (row+2)+""+(col-2), (row+1)+""+(col-1));
        return accessArray(row, col);
    }
    
    return false; 
}