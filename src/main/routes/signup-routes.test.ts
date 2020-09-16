import request from 'supertest'
import app from '../config/app'
describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Marcos Vinícius',
        email: 'marcos@mail.com',
        password: '123456',
        passwordConfirmation: '123546'
      })
      .expect(200)
  })
})
