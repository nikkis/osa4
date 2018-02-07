const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
        url: blog.url,
        id: blog._id
    }
}


blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(formatBlog))
        })
})


blogsRouter.post('/', (request, response) => {
    const { title, author } = request.body

    if (title === undefined || author === undefined) {
        return response.status(404).json({
            error: 'title or author missing'
        })
    }

    Blog
        .find({ title })
        .then(result => {
            if (result.length > 0) {
                return response.status(400).json({
                    error: 'title must be unique'
                })
            }

            const blog = new Blog({
                title, author
            })

            blog
                .save()
                .then(savedBlog => {
                    response.json(formatBlog(savedBlog))
                })
        })


})

blogsRouter.put('/:id', (request, response) => {
    const { title, author } = request.body

    Blog
        .findByIdAndUpdate(request.params.id, { title, author }, { new: true })
        .then(result => {
            response.json(result)
        })
})

blogsRouter.get('/:id', (request, response) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(formatBlog(blog))
            } else {
                response.status(404).end()
            }
        })

})

blogsRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
})



module.exports = blogsRouter