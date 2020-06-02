const app = require('./app.js')
const PORT = process.env.PORT || 3000;
require('./AutoGenerateSalary')

app.listen(PORT, console.log(`server running at port ${PORT}`))
