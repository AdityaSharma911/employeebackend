const express= require('express');
const Employee = require('./schema');
const router = new express.Router()

router.get('/', async (req,res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting one
router.get('/:id', getEmployee, (req,res) => {
    res.json(res.employee)  
})

//Creating one
router.post('/create', async (req,res) => {
    console.log(req)
    const employee = new Employee({
        fullName: req.body.fullName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        dob: req.body.dob,
        department: req.body.department
    })

    try{
        const newEmployee = await employee.save()
        return res.status(201).json(newEmployee)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
})

//Deleting One
router.delete('/:id', getEmployee, async (req,res) => {
    try{
        console.log("employee: " + res.employee)
        await res.employee.deleteOne()
        return res.json({ message: 'Deleted Employee'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
})

async function getEmployee (req, res, next) {
    let employee
    try{
        employee = await Employee.findById(req.params.id)
        if(employee === null){
            return res.status(404).json({message: 'Employee not found'})
        }
        res.employee = employee
        next()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = router
