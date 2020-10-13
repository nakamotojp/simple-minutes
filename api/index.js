const express = require('express')
const app = express()
const fs = require('fs')
const sqlite = require('sqlite3')
const db = new sqlite.Database('assets/db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/api/getNames', (req, res) => {
    db.serialize( () =>{
        db.all("SELECT id, name from names", (err, rows)=>{
            res.send(rows)
        })
    })
})

app.get('/api/getTags', (req, res) => {
    db.serialize( () => {
        db.all("SELECT id, tag, color from tags", (err, rows) => {
            res.send(rows)
        })
    })    
})

app.get('/api/getDepartments', (req, res) => {
    db.serialize( ()=>{
        db.all("SELECT id, department from departments", (err, rows) => {
            res.send(rows)
        })
    })
})

app.get('/api/getTypes', (req,res) => {
    db.serialize( () => {
        db.all('SELECT id, type from types', (err, rows) => {
            res.send(rows)
        })
    })
})

app.get('/api/getItems', (req, res) => {
    db.serialize( () => {
        db.all("SELECT * from items", (err, rows) => {
            res.send(rows)
        })
    })
})

app.post('/api/addTag', async (req, res) => {
    db.serialize( () => {
        db.run('INSERT into tags(tag) VALUES(?)', req.body.data, (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/updateTag', async (req, res) => {
    db.serialize( () => {
        db.run('UPDATE tags SET tag = ?, color = ? WHERE id = ?', [req.body.tag, req.body.color, req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/addType', async (req, res) => {
    db.serialize( () => {
        db.run('INSERT into types(type) VALUES(?)', req.body.data, (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/updateType', async (req, res) => {
    db.serialize( () => {
        db.run('UPDATE types SET type = ? WHERE id = ?', [req.body.type, req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/deleteType', async (req, res) => {
    db.serialize( () => {
        db.run('DELETE FROM types WHERE id = ?', [req.body.id], (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/addName', async (req, res) => {
    db.serialize( () => {
        db.run('INSERT into names(name) VALUES(?)', req.body.name, (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/updateName', async (req, res) => {
    db.serialize( () => {
        db.run('UPDATE names SET name = ? WHERE id = ?', [req.body.name, req.body.id], (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/deleteName', async (req, res) => {
    db.serialize( () => {
        db.run('DELETE FROM names WHERE id = ?', [req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/addDepartment', async (req, res) => {
    db.serialize( () => {
        db.run('INSERT into departments(department) VALUES(?)', req.body.department, (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/updateDepartment', async (req, res) => {
    db.serialize( () => {
        db.run('UPDATE departments SET department = ? WHERE id = ?', [req.body.department, req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })  
    })
    await res.end();
})

app.post('/api/deleteDepartment', async (req, res) => {
    db.serialize( () => {
        db.run('DELETE departments WHERE id = ?', [req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })
    })
})

app.post('/api/addItem', async (req, res) => {
    db.serialize( () => {
        let type = req.body.type
        let department = req.body.department
        let names = JSON.stringify(req.body.names)
        let tags = JSON.stringify(req.body.tags)
        let content = req.body.content
        let created = req.body.created
        let updated = req.body.updated
        db.run('INSERT into items(type, department, names, tags, content, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, department, names, tags, content, created, updated], (err) => {
                if(err){
                    console.log(err)
                }
            })
    })
    await res.end()
})

app.post('/api/deleteItem', async (req, res) => {
    db.serialize( () => {
        db.run('DELETE FROM items WHERE id = ?', [req.body.id], (err) => {
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/updateItemContent', async (req, res) => {
    db.serialize( () => {
        db.run('UPDATE items SET content = ? WHERE id = ?', [req.body.content, req.body.id], (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/deleteTag', async (req, res) => {
    db.serialize( () => {
        db.run('DELETE FROM tags WHERE id = ?', [req.body.id], (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

export default app