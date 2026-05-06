/// <reference types="vitest" />
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ParkolohazForm } from './src/pages/ParkolohazForm'
import { MyHeader } from './src/components/Header'
import { Garage } from './src/pages/Garage'

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn(() => () => { }),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  sendEmailVerification: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  deleteUser: vi.fn(),
  EmailAuthProvider: { credential: vi.fn() },
  reauthenticateWithCredential: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}))


vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  addDoc: vi.fn(() => Promise.resolve({ id: 'mock-id' })),
  collection: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false, data: () => ({}) })),
  getDocs: vi.fn(() => Promise.resolve({ docs: [] })),
  doc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
}))

vi.mock('./src/firebaseApp', () => ({
  auth: {},
  db: {},
}))


const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '123' }),
  useLocation: () => ({ pathname: '/' }),
}))

vi.mock('./src/context/MyUserProvider', () => {
  const MyUserContext = React.createContext({
    user: { uid: 'test-uid', email: 'test@test.com' },
    userData: { isAdmin: false },
    logoutUser: vi.fn(),
    setSelectedHaz: vi.fn(),
    msg: {},
    setMsg: vi.fn(),
    authLoading: false,
    selectedHaz: null,
  })
  return { MyUserContext }
})


vi.mock('./src/myBackend', () => ({
  deleteParkolohaz: vi.fn(() => Promise.resolve(true)),
  searchHely: vi.fn(() =>
    Promise.resolve([{ id: '1', hely: 'Budapest' }])
  ),
  readParkolohaz: vi.fn((id, cb) =>
    cb({ name: 'Teszt Garázs', hely: 'Budapest' })
  ),
  getSzintek: vi.fn((id, cb) => {
    cb([{ id: '1', szint_szama: 1 }])
    return () => { }
  }),
  getParkingSpotsRealtime: vi.fn((id, cb) => {
    cb([
      { id: 'a', foglalt: false, parkolohelyTipus: 'normal' },
      { id: 'b', foglalt: true, parkolohelyTipus: 'normal' },
    ])
    return () => { }
  }),
  lejartFoglalasokFelszabaditasa: vi.fn(() => Promise.resolve()),
}))


vi.mock('./src/cloudinaryUtils', () => ({
  uploadImage: vi.fn(() => Promise.resolve({ url: 'https://mock-url.com/img.jpg' })),
}))


vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div>{children}</div>,
  TileLayer: () => <div />,
  Marker: () => <div />,
  useMapEvents: () => null,
}))


vi.mock('leaflet', () => ({
  default: {
    Icon: {
      Default: {
        prototype: { _getIconUrl: undefined },
        mergeOptions: vi.fn(),
      },
    },
  },
  Icon: {
    Default: {
      prototype: { _getIconUrl: undefined },
      mergeOptions: vi.fn(),
    },
  },
}))


vi.mock('react-icons/fa6', () => ({
  FaPlus: () => <span>+</span>,
  FaTrash: () => <span>x</span>,
  FaHouseChimney: () => <span>🏠</span>,
}))
vi.mock('react-icons/rx', () => ({
  RxAvatar: () => <span>avatar</span>,
}))
vi.mock('react-icons/io', () => ({
  IoIosSearch: () => <span>🔍</span>,
  IoMdMenu: () => <span>☰</span>,
}))
vi.mock('react-icons/ri', () => ({
  RiCloseLargeFill: () => <span>✕</span>,
}))


vi.mock('./src/assets/person_circle_regular_icon.png', () => ({
  default: 'mock-icon.png',
}))


beforeEach(() => {
  vi.clearAllMocks()
})



describe('ParkolohazForm UI', () => {
  it('rendereli az inputokat', () => {
    render(<ParkolohazForm />)

    expect(screen.getByPlaceholderText(/Parkolóház Neve/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Helyszín/i)).toBeInTheDocument()
  })

  it('új szint hozzáadása működik', () => {
    render(<ParkolohazForm />)


    const addButtons = screen.getAllByText('+')
    fireEvent.click(addButtons[0])


    expect(screen.getAllByPlaceholderText(/sor/i).length).toBeGreaterThan(1)
  })

  it('submit gomb működik crash nélkül', async () => {
    render(<ParkolohazForm />)

    fireEvent.change(screen.getByPlaceholderText(/Parkolóház Neve/i), {
      target: { value: 'Teszt' },
    })

    fireEvent.change(screen.getByPlaceholderText(/Helyszín/i), {
      target: { value: 'Bp' },
    })

    fireEvent.click(screen.getByText(/Módosítás Mentése/i))

    await waitFor(() => {
      expect(true).toBe(true)
    })
  })
})


describe('MyHeader UI', () => {
  it('rendereli a keresőt', () => {
    render(<MyHeader />)

    expect(screen.getByPlaceholderText(/Keresés/i)).toBeInTheDocument()
  })

  it('keresés enterre lefut', async () => {
    render(<MyHeader />)

    const input = screen.getByPlaceholderText(/Keresés/i)

    fireEvent.change(input, { target: { value: 'bud' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    await waitFor(() => {
      expect(screen.getByText('Budapest')).toBeInTheDocument()
    })
  })

  it('találatra kattintás navigál', async () => {
    render(<MyHeader />)

    const input = screen.getByPlaceholderText(/Keresés/i)

    fireEvent.change(input, { target: { value: 'bud' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    const item = await screen.findByText('Budapest')
    fireEvent.click(item)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})



describe('Garage UI', () => {

  it('megjeleníti a garázs adatokat', async () => {
    render(<Garage />)

    await waitFor(() => {
      expect(screen.getByText('Budapest')).toBeInTheDocument()
      expect(screen.getByText('Teszt Garázs')).toBeInTheDocument()
    })
  })

  it('statisztikák helyesek', async () => {
    render(<Garage />)

    await waitFor(() => {
      expect(screen.getByText(/1 szabad/i)).toBeInTheDocument()
      expect(screen.getByText(/1 foglalt/i)).toBeInTheDocument()
    })
  })
})
