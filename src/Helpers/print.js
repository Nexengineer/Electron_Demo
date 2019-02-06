import {remote} from 'electron';
import fs from'fs';
import path from 'path';
import jsPDF from 'jspdf';

module.exports = {
    print: print
}

function print (file, text) {

    var doc = new jsPDF();

    // doc.setFontSize(40);
    // doc.text("Octonyan loves jsPDF", 35, 25); 
    // var newText = doc.text  
    // console.log(doc.save("Receipt"))
    // console.log(doc.fromHTML("<!DOCTYPE html><html><body><h1>My First Heading</h1> <p>My first paragraph.</p></body></html>"))
    
    let win = new remote.BrowserWindow({show: true});
    // fs.writeFile(path.join(__dirname,'print.pdf'), newText)

    // console.log(file, text)
    
//    win.loadURL('file://'+__dirname+'/template.html')
    win.loadURL('file://'+__dirname+'/PrintInvoice/invoice.html')

    setTimeout(function(){
        win.webContents.on('did-finish-load', () => {
            // win.webContents.print({silent:false})
            // setTimeout(function(){
            //   win.close();
            // }, 1000);
        })
    }, 50)
    
}