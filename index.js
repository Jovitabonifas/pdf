const pdfdocument= require("pdfkit")
const pdftable= require("voilab-pdf-table")
const fs= require('fs')


const pdf =new pdfdocument({
   autoFirstPage:false
}),
table = new pdftable(pdf,{
   bottomMargin:30
})
 

 table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right'
            })
            // add table columns
            .addColumns([
                {
                    id: 'description',
                    header: 'Product',
                    align: 'left'
                },
                {
                    id: 'quantity',
                    header: 'Quantity',
                    width: 70
                },
                {
                    id: 'price',
                    header: 'Price',
                    width: 70
                },
                {
                    id: 'total',
                    header: 'Total',
                    width: 70,
                    renderer: function (tb, data) {
                        return 'CHF ' + data.total;
                    }
                }
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });
 
        // if no page already exists in your PDF, do not forget to add one
        pdf.addPage();
 
        // draw content, by passing data to the addBody method
        table.addBody([
            {description: 'Product 1', quantity: 1, price: 20.10, total: 20.10},
            {description: 'Product 2', quantity: 4, price: 4.00, total: 16.00},
            {description: 'Product 3', quantity: 2, price: 17.85, total: 35.70}
        ]);
 pdf.end()

 pdf.pipe(fs.createWriteStream("output1.pdf"))

 
 /*pdf.image('image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
 });

 pdf.text("Hello World")
 .fontSize(25)

 pdfdocument.addPage()
 .text("this is another page in pdf file")
 .fontSize(50)

 pdfdocument.end()*/