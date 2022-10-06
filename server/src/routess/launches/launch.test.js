const request = require('supertest');
const app = require('../../app')


describe('TEST GET /launches', () => {
    test('it should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect(200).expect('content-type', /json/)
        
    })
})

describe('TEST POST /launches', () => {

    const completeLaunchData = {
        mission: "USS-Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
        launchDate: "January 4, 2028"
    }
    const launchDataWithoutDate = {
        mission: "USS-Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
    }
    const completeLaunchWithInvalidDate = {
        mission: "USS-Enterprise",
        rocket: "NCC 1701-D",
        target: 'Kepler-186 f',
        launchDate: "hello"
    }

   
    test('it should respond with 201 sucesss', async () => {

      
        const response  = await (await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect(201)
        .expect('content-type', /json/))
        
        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)
        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch the missing prperties', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect(400)
      .expect('content-type', /json/)

    expect(response.body).toStrictEqual({msg: "missing arguments"})

    })
    test('It should catch the invalid dates', async () => {
        const response = await request(app)
          .post('/launches')
          .send(completeLaunchWithInvalidDate)
          .expect(400)
          .expect('content-type', /json/)

        expect(response.body).toStrictEqual({error: 'Invalid error date'})
    })
})