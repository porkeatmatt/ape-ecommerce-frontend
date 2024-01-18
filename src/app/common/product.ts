export class Product {
        constructor(
        public id: string,
        public name: string,
        public description: string,
        public unitPrice: number,
        public imageUrl: string,
        public dateCreated: Date,
        public lastUpdated: Date,
        public categoryName: string
        ){}
}

