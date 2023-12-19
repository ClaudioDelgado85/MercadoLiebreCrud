const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
	index: (req, res) => {
		
		const visited=products.filter (product=>product.category=='visited')
		const inSale=products.filter (product=>product.category=='in-sale')
		res.render('index',{visited,inSale,toThousand});
	},
	search: (req, res) => {
		const busqueda = req.query.keywords;
		const resultado= [];
		products.forEach(element => {
			if (element.name.includes(busqueda)){
				resultado.push(element);
			}
		});
		res.render('results',{resultado,busqueda})
	},
};



module.exports = mainController;
