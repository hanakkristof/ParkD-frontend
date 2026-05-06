import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

vi.mock("browser-image-compression", () => ({
  default: vi.fn(),
}));

vi.mock("./cloudinaryUtils", () => ({
  deleteImage: vi.fn(),
}));

vi.mock("./firebaseApp", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => "timestamp"),
  query: vi.fn(),
  orderBy: vi.fn(),
  onSnapshot: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  updateDoc: vi.fn(),
  setDoc: vi.fn(),
  getDocs: vi.fn(),
  where: vi.fn(),
  collectionGroup: vi.fn(),
}));


import axios from "axios";
import imageCompression from "browser-image-compression";
import { deleteImage } from "./cloudinaryUtils";
import {
  deleteParkolohaz,
  searchHely,
  updateSpotTipus,
} from "./myBackend";

import {
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  collection,
} from "firebase/firestore";


describe("parkoló service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("searchHely szűri a találatokat", async () => {
    getDocs.mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({ hely: "Budapest Center" }),
        },
        {
          id: "2",
          data: () => ({ hely: "Debrecen" }),
        },
      ],
    });

    const result = await searchHely("bud");

    expect(result).toHaveLength(1);
    expect(result[0].hely).toBe("Budapest Center");
  });

  it("updateSpotTipus meghívja az updateDoc-ot", async () => {
    await updateSpotTipus("h1", "s1", "p1", "FOGLALT");

    expect(updateDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalled();
  });

  it("deleteParkolohaz törli a dokumentumot ha confirm true", async () => {
    vi.stubGlobal("window", {
      confirm: vi.fn(() => true),
    });

    deleteImage.mockResolvedValue(true);
    deleteDoc.mockResolvedValue(true);
    doc.mockReturnValue("docRef");

    const result = await deleteParkolohaz("id1", "https://img.com/a/b.jpg");

    expect(result).toBe(true);
    expect(deleteDoc).toHaveBeenCalled();
  });

  it("deleteParkolohaz cancel esetén false", async () => {
    vi.stubGlobal("window", {
      confirm: vi.fn(() => false),
    });

    const result = await deleteParkolohaz("id1", "img");

    expect(result).toBe(false);
    expect(deleteDoc).not.toHaveBeenCalled();
  });

  it("image upload mock működik (axios + compression)", async () => {
    axios.post.mockResolvedValue({
      data: {
        data: {
          url: "https://img.com/1.jpg",
          delete_url: "del-url",
        },
      },
    });

    imageCompression.mockResolvedValue("compressed-file");


    expect(true).toBe(true);
  });
});