
// button
// srcElement

// touchstart - fired when a touch point is placed on the touch surface.
// touchmove - fired when a touch point is moved along the touch surface.
// touchend - fired when a touch point is removed from the touch surface.


// -------------------------------------------------------------------------
whsl = {
    mflg:false,
    mxstart: 0,
    mxend:0,

    mxmin:0,
    mxmax:0,
    mxlast:0,

    mxdir:0

};

// -------------------------------------------------------------------------
tout = undefined;
tint = undefined;

function wsanime() {
    whsl.mxdir = whsl.mxdir == 0 ? 1 : whsl.mxdir;
    document.querySelectorAll('.wheel_slider').forEach( (ws) => {
        ws.querySelectorAll('.wheel_products').forEach((wp) => {
            wp.style.transition = '1s ease-in-out';
            ws.dataset.rotang = parseInt(ws.dataset.rotang) + (parseInt(wp.dataset.minang)*whsl.mxdir);
            wp.style.transform = 'rotateX(var(--wheel_ang)) rotateZ(' + ws.dataset.rotang + 'deg)';
        });
    });
    clearTimeout(tout);
    tout = setTimeout(wsanime, 5000);

}

// Setting Up Wheel Sliders Products Start ---------------------------------
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.dataset.rotang = 0;
    ws.querySelectorAll('.wheel_products').forEach( (wp) => {
        wp.dataset.minang = 360 / wp.children.length;
        let ind = 0;
        for (let ele of wp.children) {
            if(wp.children.length > 1){
                ele.style.rotate = (wp.dataset.minang * ind) + 'deg';
            }
            ind++;
        }
    });
});

// Fro Animation ###
// tint = setInterval(wsanime, 10000);
tout = setTimeout(wsanime, 5000);

// Setting Up Wheel Sliders Products End -----------------------------------


// CLick and Touch initiate Start ------------------------------------------
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('mousedown',(eve) => {
        wsstart(ws,eve)
    });
});
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('touchstart',(eve) => {
        wsstart(ws,eve.touches[0]);
    });
});

function wsstart(wsele,wseve){
    // console.log(wseve.clientX);
    clearInterval(tint);
    clearTimeout(tout);

    whsl.mflg = true;
    whsl.mxstart = wseve.clientX;
    wsele.style.cursor = 'grabbing';
    // ws.style.transition = 'unset';

}
// CLick and Touch initiate End --------------------------------------------


// Click and Touch Finished Start ------------------------------------------
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('mouseup',(eve) => {wsstop(ws,eve)});
});
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('mouseleave',(eve) => {wsstop(ws,eve)});
});
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('touchend',(eve) => {wsstop(ws,eve)});
});

function wsstop(ws,eve){
    // console.log('Stop');
    if (whsl.mflg) {
        whsl.mflg = false;
        ws.style.cursor = '';
        ws.querySelectorAll('.wheel_products').forEach((wp) => {
            // wp.style.transition = '';
            // console.log(Math.floor(parseInt(ws.dataset.rotang) / parseInt(wp.dataset.minang)) * parseInt(wp.dataset.minang));
            ws.dataset.rotang = Math.floor(parseInt(ws.dataset.rotang) / parseInt(wp.dataset.minang)) * parseInt(wp.dataset.minang);
            wp.style.transform = 'rotateX(var(--wheel_ang)) rotateZ(' + ws.dataset.rotang + 'deg)';
        });
    }
    // tout = setTimeout(()=>{ tint = setInterval(wsanime, 5000); },5000);
    tout = setTimeout(wsanime, 10000);

}
// Click and Touch Finished End --------------------------------------------


// Click and Touch Move Start ----------------------------------------------
document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('mousemove',(eve) => {
        wsmove(ws,eve);
    });
});

document.querySelectorAll('.wheel_slider').forEach( (ws) => {
    ws.addEventListener('touchmove',(eve) => {
        wsmove(ws,eve.touches[0])
    });
});

function wsmove(ws,eve) {
    // console.warn(Math.floor((eve.clientX / 10) - (whsl.mxstart / 10)));
    if(whsl.mflg){
        if (ws.dataset.rotang == undefined) { ws.dataset.rotang = 0};
        switch (whsl.mxdir) {
            case 0:
                whsl.mxdir = eve.clientX > whsl.mxstart ? 1 : -1;
                // whsl.mxlast = eve.clientX;
                break;
            case 1:
                if (eve.clientX < whsl.mxlast) {
                    whsl.mxstart = eve.clientX;
                    whsl.mxdir = -1;
                }
                break;
            case -1:
                if (eve.clientX > whsl.mxlast) {
                    whsl.mxstart = eve.clientX;
                    whsl.mxdir = 1;
                }
                break;
            
            default:
                break;
        }
        whsl.mxlast = eve.clientX;
        ws.dataset.rotang = parseInt(ws.dataset.rotang) - Math.floor((eve.clientX- whsl.mxstart)/50);
        ws.querySelectorAll('.wheel_products').forEach((wp) => {
            wp.style.transform = 'rotateX(var(--wheel_ang)) rotateZ(' + ws.dataset.rotang + 'deg)';
            wp.style.transition = ws.dataset.rotang + 'ms ease';
        });
    }
}

// Click and Touch Move End ------------------------------------------------