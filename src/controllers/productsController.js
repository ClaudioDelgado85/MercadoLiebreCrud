const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const getJson = ()=>{
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
return products;

}


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products=getJson();
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id=req.params.id
		const products=getJson();
		const producto=products.find(element=>element.id==id)
		res.render('detail',{title:producto.name,producto,toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const file=req.file;
		const products=getJson();
		const {name,price,discount,category,description}=req.body;
		const id =products[products.length -1].id + 1;
		let nuevoProducto={
			id:+id,
			name:name.trim(),
			price:+price,
			discount:+discount,
			category,
			description:description.trim(),
			image:file ? file.filename : "default-image-png"
		}
		products.push(nuevoProducto);
		const json=JSON.stringify(products);
		fs.writeFileSync(productsFilePath,json,"utf-8");
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id=req.params.id
		const products=getJson();
		const producto=products.find(element=>element.id==id)
		res.render('product-edit-form',{producto,toThousand});
	},
	// Update - Method to update
	update: (req, res) => {
		id = +req.params.id;
		const products=getJson();
		const file=req.file;
		const {name,price,discount,category,description,image}=req.body;

		const productToDelete = products.find(product => product.id === id);
		if (productToDelete.image && productToDelete.image !== "default-image-png") {
		   const EliminarImagePath = path.join(__dirname, '../../public/images/products', productToDelete.image);
		   fs.unlinkSync(EliminarImagePath);
		 }

		const nuevoArray=products.map(producto=>{
			if (producto.id == id){
				return {
					id:+id,
					name:name.trim(),
					price:+price,
					discount:+discount,
					category,
					description: description.trim(),
					image: file ? file.filename  : producto.image
				}
			}
			return producto
		})
		const json=JSON.stringify(nuevoArray);
		fs.writeFileSync(productsFilePath,json,"utf-8")
		res.redirect('/products/detail/'+id)
	},

	// Delete - Delete one product from DB

	
	destroy : (req, res) => {
		 id = +req.params.id;
		 const products=getJson();

		 // para eliminar la imagen 
		 const productToDelete = products.find(product => product.id === id);
		 if (productToDelete.image && productToDelete.image !== "default-image-png") {
			const EliminarImagePath = path.join(__dirname, '../../public/images/products', productToDelete.image);
			fs.unlinkSync(EliminarImagePath);
		  }

		// para eliminar el producto del json
		 productsRestantes= products.filter(product=>product.id !== id)
		 fs.writeFileSync(productsFilePath,JSON.stringify(productsRestantes),'utf-8')
		 res.redirect('/products')
	}
};

module.exports = controller;