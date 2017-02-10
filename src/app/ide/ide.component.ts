import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css'],
})

export class IdeComponent {
  @ViewChild('editor') editor;
  text: string = ``;
  innerHate: number;
  @ViewChild('windowSize') bodyEl: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    //this.editor.setTheme("eclipse");
    this.editor.setTheme("monokai");
    this.editor.setMode("c_cpp");
    this.editor._editor.$blockScrolling = Infinity;
    this.editor._editor.setBehavioursEnabled(false);
    this.editor.getEditor().setOptions({
      useWorker: false,
      autoScrollEditorIntoView: true,
      
    });

    console.log(this.editor);
    this.editor._editor.text = this.text;
    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function (editor) {

      }
    });
    this.innerHate = this.bodyEl.nativeElement.offsetHeight;

  }

  onResize(event) {
    this.innerHate = this.bodyEl.nativeElement.offsetHeight;
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
