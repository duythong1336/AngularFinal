import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import {Book} from '../models/book';
import { Options } from '../models/options';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.css']
})
export class MainEventComponent implements OnInit {
  // private itemsCollection: AngularFirestoreCollection<Books>;
	// books: Observable<Books[]>;
  constructor(private readonly afs: AngularFirestore
    ,private fb: FormBuilder,private modalService: NgbModal) {
      this.loadDataFromFB(this.afs)
    // this.itemsCollection = afs.collection<Books>('Books');
    // this.books = this.itemsCollection.valueChanges( { idField: 'key' });
   }

  ngOnInit(): void {
  }
  public alphabetTitle = true;
  public ascPrice = true;
  updateID: number = 2;
  addID: number = 1;
  closeResult: string | undefined;
  itemsCollection: AngularFirestoreCollection<Book> | undefined;
  bookList: Book[] = [];
  allList: Book[] =[];
  book! : Book;
  docID!: string;
  collectionSize: number = 0;
  oldBook!: Book; 
  page: number = 1;
  pageSize: number = 4;
  checkExist: Query<Book> | undefined;
  prices: Options[] = [
    { ID: 1, Name: 'All prices' },
    { ID: 2, Name: 'Upper 999$' },
    { ID: 3, Name: '899-999$' },
    { ID: 4, Name: 'Lower 899$' },
  ];
  types: Options[] = [
    { ID: 1, Name: 'Choose a type'},
    { ID: 2, Name: 'Detective'},
    { ID: 3, Name: 'Literature'},
    { ID: 4, Name: 'Sport'}

  ]
  quantities: Options[] = [
    {ID: 1, Name: 'All quantity'},
    {ID: 2, Name: '0-5'},
    {ID: 3, Name: '6-10'},
    {ID: 4, Name: '10-15'},
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

  loadDataFromFB(afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Book>('Books');
    this.itemsCollection.valueChanges({ idField: 'key' }).subscribe((data) => {
      this.bookList = data;
      console.log(data[0].Id)
      this.allList = this.bookList;
      this.collectionSize = this.bookList.length;

    });
  }

  filter(event: any): void{
    switch (event.target.value){
      case this.quantities[0].Name:
        this.bookList = this.allList;
        break;
      case this.quantities[1].Name:
        this.bookList = this.allList.filter((books) => books.Quantity < 6)
        break;
      case this.quantities[2].Name:
        this.bookList = this.allList.filter((books) => books.Quantity > 6 && books.Quantity < 11)
        break;
      case this.quantities[3].Name:
        this.bookList = this.allList.filter((books) => books.Quantity > 10 && books.Quantity < 16)
        break;
    }
  }
  searchBook() {
    var textSearch = (<HTMLInputElement>document.getElementById('searchInput'))
      .value;
    var filter = <HTMLSelectElement>document.getElementById('filter');
    var value = filter.options[filter.selectedIndex].value;
    if (textSearch == ''){
      this.bookList = this.allList
    }
    if (textSearch !== ''){
      if( value === this.quantities[0].Name){
        this.bookList = this.allList.filter((book) =>
          book.Title.toLowerCase().includes(textSearch.toLowerCase()) ||
          book.Author.toLowerCase().includes(textSearch.toLowerCase()) ||
          book.Description.toLowerCase().includes(textSearch.toLowerCase()) ||
          book.Price.toString().toLowerCase().includes(textSearch.toLowerCase()) 
        );
      }
      this.bookList = this.bookList.filter((book) =>
      book.Title.toLowerCase().includes(textSearch.toLowerCase()) ||
      book.Author.toLowerCase().includes(textSearch.toLowerCase()) ||
      book.Description.toLowerCase().includes(textSearch.toLowerCase()) ||
      book.Price.toString().toLowerCase().includes(textSearch.toLowerCase())
      );
    }

  }
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
    this.checkExist = this.itemsCollection?.ref
      .where('Title', '==', title)
      .where('Author', '==', author)
    this.checkExist?.get().then((books) => {
      if (books.size > 0) {
        Swal.fire('Fail', 'Book already exists', 'error');
      } else {
        
        const book_from_fs = this.itemsCollection?.doc(this.book.Id)
        if (!book_from_fs) {
          console.log('error here')
          return
        }
        book_from_fs.set(Object.assign({}, this.book));
        Swal.fire('Success', 'Book has been added', 'success');
        let clearAddForm = <HTMLFormElement>document.getElementById('add-form');
        clearAddForm.reset();
        this.modalService.dismissAll('Dismissed by pressing ESC');
        console.log(this.book)
      }
    });
  }
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
    this.checkExist = this.itemsCollection?.ref
      .where('Title', '==', title)
      .where('Author', '==', author)
    if (
      this.oldBook.Title === title &&
      this.oldBook.Author === author &&
      this.oldBook.Description === description &&
      this.oldBook.Type === type &&
      this.oldBook.Quantity == quantity&&
      this.oldBook.Price === price 
    ) {
      Swal.fire('The data has not changed', '', 'warning');
      this.modalService.dismissAll('Dismissed by pressing ESC');
    } else {
      this.checkExist?.get().then((books) => {
        if (books.size > 0) {
          Swal.fire('Book already exists', '', 'error');
        } else {
          this.itemsCollection?.doc(this.docID).update(this.book);
          Swal.fire('Book has been updated!', '', 'success');
          this.modalService.dismissAll('Dismissed by pressing ESC');
        }
      });
    }
  }
  deleteBook(event: any): void {
    this.docID = event.target.id.toString();
    Swal.fire({
      title: 'Do you want to delete this book?',
      showCancelButton: true,
      confirmButtonText: 'DELETE',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('book has been deleted!', '', 'success');
        this.itemsCollection?.doc(this.docID).delete();
      }
    });
  }
  open(content: any, id: number, event: any): void {
    if (id === 1) {
      this.addForm.reset();
      this.addForm.patchValue({
        price: this.prices[0].Name,
        type: this.types[0].Name,
      });
    } else {
      this.docID = event.target.id;
      console.log(event.target.id)
      this.oldBook = this.bookList.filter(
        (book) => book.Id === event.target.id
      )[0];
      
      console.log(this.oldBook)
      this.updateForm.patchValue(
        {
          title: this.oldBook.Title,
          author: this.oldBook.Author,
          description: this.oldBook.Description,
          type: this.oldBook.Type,
          price: this.oldBook.Price,
          quantity: this.oldBook.Quantity,
        }
      );
    }
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
  sortByPrice = () => {
    if (this.ascPrice === true) {
      this.bookList.sort((a, b) => b.Price - a.Price);
      this.ascPrice = false;
    } else {
      this.bookList.sort((a, b) => a.Price - b.Price);
      this.ascPrice = true;
    }
  };
  sortByTitle = () => {
    if (this.alphabetTitle === true) {
      this.bookList.sort(function (a, b) {
        var titleA = a.Title.toUpperCase();
        var titleB = b.Title.toUpperCase();
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      });
      this.alphabetTitle = false;
    } else {
      this.bookList.sort(function (a, b) {
        var titleA = a.Title.toUpperCase();
        var titleB = b.Title.toUpperCase();
        return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
      });
      this.alphabetTitle = true;
    }
  };
}
