import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Query,
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Book } from 'src/app/models/book';
import { Options } from '../models/options';
import { BookService } from '../services/book.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-product-nodejs',
  templateUrl: './product-nodejs.component.html',
  styleUrls: ['./product-nodejs.component.css']
})
export class ProductNodejsComponent implements OnInit {
  idbtn: string = '';
  addID: number = 1;
  updateID: number = 2;
  allList: Book[] =[];
  book! : Book;
  itemsCollection: AngularFirestoreCollection<Book> | undefined;
  docID!: string;
  collectionSize: number = 0;
  oldBook!: Book; 
  page: number = 1;
  pageSize: number = 3;
  bookList: Book[] = [];
  checkExist: Query<Book> | undefined;
  closeResult: string | undefined;
  constructor(private service: BookService,
    private modalService: NgbModal,
    private fb: FormBuilder,) {
    this.service.getItems().subscribe(data => this.bookList = data)
   }
  
  ngOnInit(): void {
  }
  types: Options[] = [
    { ID: 1, Name: 'Choose a type'},
    { ID: 2, Name: 'Detective'},
    { ID: 3, Name: 'Literature'},
    { ID: 4, Name: 'Sport'}

  ]
  

  addForm = this.fb.group({
    description: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
    author: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    type: [this.types[0].Name],
    price: [, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
    quantity: [, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
  });


  updateForm = this.fb.group({
    description: [
      '',
      [Validators.required, Validators.minLength(6)],
    ],
    author: [ '',[ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    type: [ '' ],
    price: [, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
    quantity: [, [Validators.required, Validators.pattern('[1-9][0-9]*')]],
  });
  addBook() {
    let id = uuid();
    let description = this.addForm.controls.description.value;
    let author = this.addForm.controls.author.value;
    let title = this.addForm.controls.title.value;
    let type = this.addForm.controls.type.value.substring(0, 10);
    let price = this.addForm.controls.price.value;
    let quantity = this.addForm.controls.quantity.value;
    this.book = {
      Id: id,
      Author: author,
      Description: description,
      Title: title,
      Type: type,
      Price: price,
      Quantity: quantity,
    };
    console.log('abcd')
     this.service.insertItem(this.book).subscribe();
    console.log(this.book)
    Swal.fire('Success', 'Book has been added', 'success');
    let clearAddForm = <HTMLFormElement>document.getElementById('add-form');
    clearAddForm.reset();
    this.modalService.dismissAll('Dismissed by pressing ESC');
    console.log(this.book)   
    };
  updateBook() {
    let description = this.updateForm.controls.description.value;
    let author = this.updateForm.controls.author.value;
    let title = this.updateForm.controls.title.value;
    let type = this.updateForm.controls.type.value.substring(0, 15);
    let price = this.updateForm.controls.price.value;
    let quantity = this.updateForm.controls.quantity.value;
    this.book = {
      Id: this.docID,
      Author: author,
      Description: description,
      Title: title,
      Type: type,
      Price: price,
      Quantity: quantity,

    };
    Swal.fire({
      title: 'Do you want to update this book?',
      showCancelButton: true,
      confirmButtonText: 'UPDATE',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.updateItem(this.book).subscribe();
        this.modalService.dismissAll('Dismissed by pressing ESC');
        Swal.fire('Book has been updated!', '', 'success');
      }
    });
    
    
  }
  deleteBook(event: any): void {
    Swal.fire({
      title: 'Do you want to delete this book?',
      showCancelButton: true,
      confirmButtonText: 'DELETE',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('book has been deleted!', '', 'success');
        this.service.deleteItem(event.target.id).subscribe();
      }
    });
  }

  // getId(event: any) {
  //   this.idbtn = event.target.id;
  //   let item = new Book();
  //   item = this.book
  // }
  open(content: any, id: number, event: any): void {
    if (id === 1) {
      this.addForm.reset();
      this.addForm.patchValue({

        type: this.types[0].Name,
      });
    } else {
      // let data: any[] = [];
      
      // var row = $(event.target).closest('tr');
      // var cells = row.find('.data');
      // for (var i = 0; i < cells.length; i++) {
      //   data.push(cells[i].innerText);
      // }
      this.idbtn = event.target.id;
      console.log(this.idbtn)
      let itemobj = new Book()
      itemobj = this.bookList.filter((item) => item.Id == this.idbtn)[0];
      console.log(JSON.stringify(itemobj))
      this.updateForm.patchValue({
        title: itemobj.Title,
        author: itemobj.Author,
        type: itemobj.Type,
        price: itemobj.Price,
        description: itemobj.Description,
        quantity: itemobj.Quantity
      })
    };
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
