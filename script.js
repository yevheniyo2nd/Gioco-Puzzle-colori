// Declare the variables in a broader scope
let itemMiddle;
let itemRight;
//display
const blocksDisplay = document.getElementById('blocksDisplay');
const infoDisplay = document.getElementById('infoDisplay');
const logsDisplay_text = document.getElementById('logsDisplay_text');
//id
const containerMiddle = document.getElementById('container_middle_top');
const containerRight = document.getElementById('container_right_top');

//animation 
function logDisplayAnimation() {
    logsDisplay_text.style.opacity = 1
    setTimeout(() => {
        logsDisplay_text.style.opacity = 0.4
    }, 500);
}

// Select all class item
const itemLeft = document.querySelectorAll('.item_left');
// For each
itemLeft.forEach(i => {
    i.addEventListener('click', () => {
        if (!i.classList.contains('item_left-active')) {
            // Delete middle item
            if (itemMiddle) {
                itemMiddle.forEach(i => {
                    i.remove();
                });
            }
            // Delete right item
            if (itemRight) {
                itemRight.forEach(i => {
                    i.remove();
                });
            }
            // Remove class from all items
            itemLeft.forEach(a => a.classList.remove('item_left-active'));
            // Add new class
            i.classList.add('item_left-active');
            //console
            logsDisplay_text.textContent = 'Select an color'
            logsDisplay_text.textContent = `level ${i.textContent} open`
            //animation for logs
            logDisplayAnimation()
            //levels
            switch (i.textContent) {
                case '1' : {level_1()}; break;//ua
                case '2' : {level_2()}; break;//ru
                case '3' : {level_3()}; break;//it
            }
        } else {
            // Delete middle item
            if (itemMiddle) {
                itemMiddle.forEach(i => {
                    i.remove();
                });
            }
            // Delete right item
            if (itemRight) {
                itemRight.forEach(i => {
                    i.remove();
                });
            }
            // Remove class from all items
            itemLeft.forEach(a => a.classList.remove('item_left-active'));
            //console
            blocksDisplay.textContent = ''
            infoDisplay.textContent = 'Select an level on Levels panel'
            logsDisplay_text.textContent = `level ${i.textContent} close`
            //animation for logs
            logDisplayAnimation()
        }

        //delete H2 tag
        const h2Element = containerMiddle.querySelector('h2');
        if (h2Element) {
            h2Element.remove();
        }
    });
});


//levels
function level_1() {
    //blocks
    let blocks = 0;//
    let maxBlocks = 6;
    let maxColors = 2;

    //display blocks
    blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
    infoDisplay.textContent = `Select a color from Colors panel`;

    // MIDDLE
    // Create middle items
    for (let i = 0; i < maxBlocks; i++) {
        const itemMiddle = document.createElement('div');
        itemMiddle.classList.add('item_middle');
        itemMiddle.classList.add('item_middle-level_1');//CHANHE
        itemMiddle.textContent = i;

        // серо белый фон
        if (i % 2 === 0) {
            itemMiddle.style.opacity = 0.9;
        } else {
            itemMiddle.style.opacity = 1;
        }
        switch (itemMiddle.textContent) {//CHANHE
            case '0': itemMiddle.textContent = '1'; break;
            case '1': itemMiddle.textContent = '1'; break;
            case '2': itemMiddle.textContent = '1'; break;
            case '3': itemMiddle.textContent = '2'; break;
            case '4': itemMiddle.textContent = '2'; break;
            case '5': itemMiddle.textContent = '2'; break;
        }
        containerMiddle.append(itemMiddle);
    }

    // Select all class item
    itemMiddle = document.querySelectorAll('.item_middle');
    //put color on middle items
    itemMiddle.forEach(i => {
        i.addEventListener('click', () => {
            if (selectedTextContent !== null) {
                //place color
                if (!i.classList.contains('item_middle-active')) {
                    if (i.style.backgroundColor !== selectedColor) {
                        i.style.backgroundColor = selectedColor;
                        i.style.opacity = 0.6;
                        //console
                        infoDisplay.textContent = `Put again the color or select another one`;
                    } else {
                        //console
                        logsDisplay_text.textContent = `color ${selectedColor} is already dropped on this place`
                        //animation for logs
                        logDisplayAnimation()
                    }
                    //active color
                    if (i.textContent === selectedTextContent) {
                        blocks++;
                        blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
                        i.classList.add('item_middle-active');
                        i.style.opacity = 1;
                        i.textContent = '';

                        logsDisplay_text.textContent = 'right color dropped'
                        //animation for logs
                        logDisplayAnimation()
                        //level end
                        if (blocks === maxBlocks) {
                            blocksDisplay.textContent = 'level completed!'
                            infoDisplay.textContent = `Select an another level or restart this one`;
                            //active item left finished
                            if (itemLeft) {
                                itemLeft.forEach(i => {
                                    if (i.classList.contains('item_left-active')) {
                                        i.classList.remove('item_left-active')
                                        i.classList.add('item_left-finished');
                                    }
                                });
                            }
                            //create h2 tag
                            const h2 = document.createElement('h2');
                            h2.classList.add('container_middle-finished');
                            h2.textContent = 'Ukraine';
                            containerMiddle.append(h2);

                            // Delete middle item (only not active)
                            if (itemMiddle) {
                                itemMiddle.forEach(i => {
                                    if (!i.classList.contains('item_middle-active')) {
                                        i.remove();
                                    } else {
                                        i.textContent = '';
                                    }
                                });
                            }
                            // Delete right item
                            if (itemRight) {
                                itemRight.forEach(i => {
                                    i.remove();
                                });
                            }
                        }
                    } else {
                        logsDisplay_text.textContent = 'wrong color dropped'
                        //animation for logs
                        logDisplayAnimation()
                    }
                }
            } else {
                //console
                logsDisplay_text.textContent = `select an color`
                //animation for logs
                logDisplayAnimation()
            }
        });
    });



    // RIGHT
    // Create items
    for (let i = 1; i <= maxColors; i++) {
        const itemRight = document.createElement('div');
        itemRight.classList.add('item_right');
        itemRight.textContent = i;
        switch (itemRight.textContent) {//CHANHE
            case '1': itemRight.style.backgroundColor = 'rgb(33, 81, 255)'; break;//blue
            case '2': itemRight.style.backgroundColor = 'rgb(255, 242, 64)'; break;//yellow
        } 
        containerRight.append(itemRight);
    }
    // Select all class item
    itemRight = document.querySelectorAll('.item_right');
    //
    let selectedColor = null;
    let selectedTextContent = null;
    // For each
    itemRight.forEach(i => {
        i.addEventListener('click', () => {
            if (!i.classList.contains('item_right-active')) {
                // Remove class from all items
                itemRight.forEach(a => a.classList.remove('item_right-active'));
                // Add new class
                i.classList.add('item_right-active');
                // Change variable
                selectedColor = i.style.backgroundColor;
                selectedTextContent = i.textContent;
                //console
                infoDisplay.textContent = `Put the colors on game panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            } else {
                // Add new class
                i.classList.remove('item_right-active');
                // Change variable
                selectedColor = null;
                selectedTextContent = null;
                //console
                infoDisplay.textContent = `Select a color from Colors panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            }
        });
    });
}
function level_2() {
    //blocks
    let blocks = 0;//
    let maxBlocks = 9;
    let maxColors = 3;

    //display blocks
    blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
    infoDisplay.textContent = `Select a color from Colors panel`;

    // MIDDLE
    // Create middle items
    for (let i = 0; i < maxBlocks; i++) {
        const itemMiddle = document.createElement('div');
        itemMiddle.classList.add('item_middle');
        itemMiddle.classList.add('item_middle-level_2');//CHANHE
        itemMiddle.textContent = i;

        // серо белый фон
        if (i % 2 === 0) {
            itemMiddle.style.opacity = 0.9;
        } else {
            itemMiddle.style.opacity = 1;
        }
        switch (itemMiddle.textContent) {//CHANHE
            case '0': itemMiddle.textContent = '1'; break;
            case '1': itemMiddle.textContent = '1'; break;
            case '2': itemMiddle.textContent = '1'; break;
            case '3': itemMiddle.textContent = '2'; break;
            case '4': itemMiddle.textContent = '2'; break;
            case '5': itemMiddle.textContent = '2'; break;
            case '6': itemMiddle.textContent = '3'; break;
            case '7': itemMiddle.textContent = '3'; break;
            case '8': itemMiddle.textContent = '3'; break;
        }
        containerMiddle.append(itemMiddle);
    }

    // Select all class item
    itemMiddle = document.querySelectorAll('.item_middle');
    //put color on middle items
    itemMiddle.forEach(i => {
        i.addEventListener('click', () => {
            if (selectedTextContent !== null) {
                //place color
                if (!i.classList.contains('item_middle-active')) {
                    if (i.style.backgroundColor !== selectedColor) {
                        i.style.backgroundColor = selectedColor;
                        i.style.opacity = 0.6;
                        //console
                        infoDisplay.textContent = `Put again the color or select another one`;
                    } else {
                        //console
                        logsDisplay_text.textContent = `color ${selectedColor} is already dropped on this place`
                        //animation for logs
                        logDisplayAnimation()
                    }
                    //active color
                    if (i.textContent === selectedTextContent) {
                        blocks++;
                        blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
                        i.classList.add('item_middle-active');
                        i.style.opacity = 1;
                        i.textContent = '';

                        logsDisplay_text.textContent = 'right color dropped'
                        //animation for logs
                        logDisplayAnimation()
                        //level end
                        if (blocks === maxBlocks) {
                            blocksDisplay.textContent = 'level completed!'
                            infoDisplay.textContent = `Select an another level or restart this one`;
                            //active item left finished
                            if (itemLeft) {
                                itemLeft.forEach(i => {
                                    if (i.classList.contains('item_left-active')) {
                                        i.classList.remove('item_left-active')
                                        i.classList.add('item_left-finished');
                                    }
                                });
                            }
                            //create h2 tag
                            const h2 = document.createElement('h2');
                            h2.classList.add('container_middle-finished');
                            h2.textContent = 'Russia';
                            containerMiddle.append(h2);

                            // Delete middle item (only not active)
                            if (itemMiddle) {
                                itemMiddle.forEach(i => {
                                    if (!i.classList.contains('item_middle-active')) {
                                        i.remove();
                                    } else {
                                        i.textContent = '';
                                    }
                                });
                            }
                            // Delete right item
                            if (itemRight) {
                                itemRight.forEach(i => {
                                    i.remove();
                                });
                            }
                        }
                    } else {
                        logsDisplay_text.textContent = 'wrong color dropped'
                        //animation for logs
                        logDisplayAnimation()
                    }
                }
            } else {
                //console
                logsDisplay_text.textContent = `select an color`
                //animation for logs
                logDisplayAnimation()
            }
        });
    });



    // RIGHT
    // Create items
    for (let i = 1; i <= maxColors; i++) {
        const itemRight = document.createElement('div');
        itemRight.classList.add('item_right');
        itemRight.textContent = i;
        switch (itemRight.textContent) {//CHANHE
            case '1': itemRight.style.backgroundColor = 'white'; break;
            case '2': itemRight.style.backgroundColor = 'rgb(33, 81, 255)'; break;//blue
            case '3': itemRight.style.backgroundColor = 'rgb(239, 50, 50)'; break;//red
        } 
        containerRight.append(itemRight);
    }
    // Select all class item
    itemRight = document.querySelectorAll('.item_right');
    //
    let selectedColor = null;
    let selectedTextContent = null;
    // For each
    itemRight.forEach(i => {
        i.addEventListener('click', () => {
            if (!i.classList.contains('item_right-active')) {
                // Remove class from all items
                itemRight.forEach(a => a.classList.remove('item_right-active'));
                // Add new class
                i.classList.add('item_right-active');
                // Change variable
                selectedColor = i.style.backgroundColor;
                selectedTextContent = i.textContent;
                //console
                infoDisplay.textContent = `Put the colors on game panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            } else {
                // Add new class
                i.classList.remove('item_right-active');
                // Change variable
                selectedColor = null;
                selectedTextContent = null;
                //console
                infoDisplay.textContent = `Select a color from Colors panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            }
        });
    });
}
function level_3() {
    //blocks
    let blocks = 0;//
    let maxBlocks = 54;
    let maxColors = 3;

    //display blocks
    blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
    infoDisplay.textContent = `Select a color from Colors panel`;

    // MIDDLE
    // Create middle items
    for (let i = 0; i < maxBlocks; i++) {
        const itemMiddle = document.createElement('div');
        itemMiddle.classList.add('item_middle');
        itemMiddle.classList.add('item_middle-level_3');//CHANHE
        itemMiddle.textContent = i;

        // серо белый фон
        if (i % 2 === 0) {
            itemMiddle.style.opacity = 0.9;
        } else {
            itemMiddle.style.opacity = 1;
        }
        switch (itemMiddle.textContent) {//CHANHE
            case '0': itemMiddle.textContent = '1'; break;
            case '1': itemMiddle.textContent = '1'; break;
            case '2': itemMiddle.textContent = '1'; break;
            case '3': itemMiddle.textContent = '2'; break;
            case '4': itemMiddle.textContent = '2'; break;
            case '5': itemMiddle.textContent = '2'; break;
            case '6': itemMiddle.textContent = '3'; break;
            case '7': itemMiddle.textContent = '3'; break;
            case '8': itemMiddle.textContent = '3'; break;

            case '9': itemMiddle.textContent = '1'; break;
            case '10': itemMiddle.textContent = '1'; break;
            case '11': itemMiddle.textContent = '1'; break;
            case '12': itemMiddle.textContent = '2'; break;
            case '13': itemMiddle.textContent = '2'; break;
            case '14': itemMiddle.textContent = '2'; break;
            case '15': itemMiddle.textContent = '3'; break;
            case '16': itemMiddle.textContent = '3'; break;
            case '17': itemMiddle.textContent = '3'; break;

            case '18': itemMiddle.textContent = '1'; break;
            case '19': itemMiddle.textContent = '1'; break;
            case '20': itemMiddle.textContent = '1'; break;
            case '21': itemMiddle.textContent = '2'; break;
            case '22': itemMiddle.textContent = '2'; break;
            case '23': itemMiddle.textContent = '2'; break;
            case '24': itemMiddle.textContent = '3'; break;
            case '25': itemMiddle.textContent = '3'; break;
            case '26': itemMiddle.textContent = '3'; break;

            case '27': itemMiddle.textContent = '1'; break;
            case '28': itemMiddle.textContent = '1'; break;
            case '29': itemMiddle.textContent = '1'; break;
            case '30': itemMiddle.textContent = '2'; break;
            case '31': itemMiddle.textContent = '2'; break;
            case '32': itemMiddle.textContent = '2'; break;
            case '33': itemMiddle.textContent = '3'; break;
            case '34': itemMiddle.textContent = '3'; break;
            case '35': itemMiddle.textContent = '3'; break;

            case '36': itemMiddle.textContent = '1'; break;
            case '37': itemMiddle.textContent = '1'; break;
            case '38': itemMiddle.textContent = '1'; break;
            case '39': itemMiddle.textContent = '2'; break;
            case '40': itemMiddle.textContent = '2'; break;
            case '41': itemMiddle.textContent = '2'; break;
            case '42': itemMiddle.textContent = '3'; break;
            case '43': itemMiddle.textContent = '3'; break;
            case '44': itemMiddle.textContent = '3'; break;
            
            case '45': itemMiddle.textContent = '1'; break;
            case '46': itemMiddle.textContent = '1'; break;
            case '47': itemMiddle.textContent = '1'; break;
            case '48': itemMiddle.textContent = '2'; break;
            case '49': itemMiddle.textContent = '2'; break;
            case '50': itemMiddle.textContent = '2'; break;
            case '51': itemMiddle.textContent = '3'; break;
            case '52': itemMiddle.textContent = '3'; break;
            case '53': itemMiddle.textContent = '3'; break;
        }
        containerMiddle.append(itemMiddle);
    }

    // Select all class item
    itemMiddle = document.querySelectorAll('.item_middle');
    //put color on middle items
    itemMiddle.forEach(i => {
        i.addEventListener('click', () => {
            if (selectedTextContent !== null) {
                //place color
                if (!i.classList.contains('item_middle-active')) {
                    if (i.style.backgroundColor !== selectedColor) {
                        i.style.backgroundColor = selectedColor;
                        i.style.opacity = 0.6;
                        //console
                        infoDisplay.textContent = `Put again the color or select another one`;
                    } else {
                        //console
                        logsDisplay_text.textContent = `color ${selectedColor} is already dropped on this place`
                        //animation for logs
                        logDisplayAnimation()
                    }
                    //active color
                    if (i.textContent === selectedTextContent) {
                        blocks++;
                        blocksDisplay.textContent = `blocks: ${blocks}/${maxBlocks}`;
                        i.classList.add('item_middle-active');
                        i.style.opacity = 1;
                        i.textContent = '';

                        logsDisplay_text.textContent = 'right color dropped'
                        //animation for logs
                        logDisplayAnimation()
                        //level end
                        if (blocks === maxBlocks) {
                            blocksDisplay.textContent = 'level completed!'
                            infoDisplay.textContent = `Select an another level or restart this one`;
                            //active item left finished
                            if (itemLeft) {
                                itemLeft.forEach(i => {
                                    if (i.classList.contains('item_left-active')) {
                                        i.classList.remove('item_left-active')
                                        i.classList.add('item_left-finished');
                                    }
                                });
                            }
                            //create h2 tag
                            const h2 = document.createElement('h2');
                            h2.classList.add('container_middle-finished');
                            h2.textContent = 'Italy';
                            containerMiddle.append(h2);

                            // Delete middle item (only not active)
                            if (itemMiddle) {
                                itemMiddle.forEach(i => {
                                    if (!i.classList.contains('item_middle-active')) {
                                        i.remove();
                                    } else {
                                        i.textContent = '';
                                    }
                                });
                            }
                            // Delete right item
                            if (itemRight) {
                                itemRight.forEach(i => {
                                    i.remove();
                                });
                            }
                        }
                    } else {
                        logsDisplay_text.textContent = 'wrong color dropped'
                        //animation for logs
                        logDisplayAnimation()
                    }
                }
            } else {
                //console
                logsDisplay_text.textContent = `select an color`
                //animation for logs
                logDisplayAnimation()
            }
        });
    });



    // RIGHT
    // Create items
    for (let i = 1; i <= maxColors; i++) {
        const itemRight = document.createElement('div');
        itemRight.classList.add('item_right');
        itemRight.textContent = i;
        switch (itemRight.textContent) {//CHANHE
            case '1': itemRight.style.backgroundColor = 'rgb(61, 218, 95)'; break;//green
            case '2': itemRight.style.backgroundColor = 'white'; break;
            case '3': itemRight.style.backgroundColor = 'rgb(239, 50, 50)'; break;//red
        } 
        containerRight.append(itemRight);
    }
    // Select all class item
    itemRight = document.querySelectorAll('.item_right');
    //
    let selectedColor = null;
    let selectedTextContent = null;
    // For each
    itemRight.forEach(i => {
        i.addEventListener('click', () => {
            if (!i.classList.contains('item_right-active')) {
                // Remove class from all items
                itemRight.forEach(a => a.classList.remove('item_right-active'));
                // Add new class
                i.classList.add('item_right-active');
                // Change variable
                selectedColor = i.style.backgroundColor;
                selectedTextContent = i.textContent;
                //console
                infoDisplay.textContent = `Put the colors on game panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            } else {
                // Add new class
                i.classList.remove('item_right-active');
                // Change variable
                selectedColor = null;
                selectedTextContent = null;
                //console
                infoDisplay.textContent = `Select a color from Colors panel`;
                logsDisplay_text.textContent = `selected Color: ${selectedColor}`;
                //animation for logs
                logDisplayAnimation()
            }
        });
    });
}

