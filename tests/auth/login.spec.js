import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Login from '@components/auth/Login'
import expect from 'expect'
import Form from '@utils/Form'

/* eslint-disable no-undef */
describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
  })

  it('does not contain error alert', () => {
    expect(wrapper.html()).not.toContain('These credentials do not match our records.')
  })

  it('enables the sign in button', () => {
    wrapper.setData({
      form: new Form({
        email: 'frodo@baggins.sh',
        password: 'my_precious'
      })
    })

    let button = wrapper.find('button')

    expect(button.attributes().disabled).not.toBe('disabled')
  })

  it('disables the sign in button', () => {
    let button = wrapper.find('button')

    expect(button.attributes().disabled).toBe('disabled')
  })
})
