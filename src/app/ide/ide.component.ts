import { Component, OnInit, ViewChild } from '@angular/core';

import 'brace/theme/clouds';
import 'brace/mode/sql';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css'],
})

export class IdeComponent {
    @ViewChild('editor') editor;
    text: string = "";
    

    constructor() {

    }

    ngAfterViewInit() {
        //this.editor.setTheme("eclipse");
        this.editor.setTheme("monokai");
        this.editor.setMode("c_cpp");
        this.editor._editor.$blockScrolling = Infinity
        this.editor.getEditor().setOptions({
            useWorker: false,
            autoScrollEditorIntoView: true
        });
  

        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {
              console.log(editor);
            }
        })
    }
}

/*
export class IdeComponent implements OnInit {

  text: string;
  options: any = { maxLines: 1000, printMargin: false };

  constructor() {
    this.text = 'test';
    this.options = { printMargin: false };

  }

  onChange(data) {
    console.log(data);
  }

  ngOnInit() {

  }
}*/
