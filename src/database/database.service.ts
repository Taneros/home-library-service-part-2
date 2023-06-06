import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { removeObjField, unixTimeStampSec } from 'src/utils/utils';
import { v4 as uuidv4 } from 'uuid';

interface Data {
  user: User[];
  artist: Artist[];
  track: Track[];
  album: Album[];
  favorites: Fav;
}

@Injectable()
export class DatabaseService {
  data: Data = {
    user: [
      {
        login: 'admin',
        password: 'admin1',
        id: '92c642d5-192c-40aa-a41a-39077d1f461c',
        version: 1,
        createdAt: 1685720272,
        updatedAt: 1685720272,
      },
    ],
    artist: [
      {
        id: 'fdcf03dc-cf77-4695-9cf1-1ef850975d02',
        name: 'U2',
        grammy: true,
      },
    ],
    album: [
      {
        id: 'deef381f-b850-444c-9b29-35e90da68348',
        name: 'The Joshua Tree',
        year: 1987,
        artistId: 'fdcf03dc-cf77-4695-9cf1-1ef850975d02',
      },
    ],
    track: [
      {
        id: 'fff32e1c-3477-4ea0-905d-fffb6fdc38b4',
        name: 'With or Without You',
        artistId: 'fdcf03dc-cf77-4695-9cf1-1ef850975d02',
        albumId: 'deef381f-b850-444c-9b29-35e90da68348',
        duration: 296,
      },
    ],
    favorites: {
      // artists: [{ id: 'fdcf03dc-cf77-4695-9cf1-1ef850975d02' }],
      // albums: [{ id: 'deef381f-b850-444c-9b29-35e90da68348' }],
      // tracks: [{ id: 'fff32e1c-3477-4ea0-905d-fffb6fdc38b4' }],
      artists: [],
      albums: [],
      tracks: [],
    },
  };
  // *** User ***
  createUser(user: CreateUserDto): Partial<User> {
    const timeStamp = unixTimeStampSec();
    const newUser = {
      ...user,
      id: uuidv4(),
      version: 1,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };

    this.data.user.push(newUser);
    return removeObjField(newUser, 'password');
  }

  findAllUsers() {
    return this.data.user;
  }

  findOneUser(id: string) {
    return this.data.user.find((user) => user.id === id) || null;
  }

  updateUser(id: User['id'], user: Partial<User>) {
    const oldUser = this.data.user.find((user) => user.id === id);
    const updatedUser: User = {
      ...oldUser,
      ...user,
      version: oldUser.version + 1,
      updatedAt: unixTimeStampSec() + 1,
    };

    this.data.user = this.data.user.map((user) => {
      if (user.id === id) return updatedUser;
      return user;
    });

    return removeObjField(updatedUser, 'password');
  }

  deleteUser(id: User['id']) {
    const deletedUserIdx = this.data.user.findIndex((user) => user.id === id);
    if (deletedUserIdx !== -1) {
      const deletedUser = this.data.user.splice(deletedUserIdx, 1);

      return removeObjField(deletedUser, 'password');
    }
    return null;
  }
  // *** Artist ***
  createArtist(createArtistDto: CreateArtistDto): Partial<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.data.artist.push(newArtist);
    return newArtist;
  }

  findAllArtists() {
    return this.data.artist;
  }

  findOneArtist(id: Artist['id']) {
    return this.data.artist.find((artist) => artist.id === id) || null;
  }

  updateArtist(id: Artist['id'], artist: Partial<Artist>) {
    const oldArtist = this.data.artist.find((artist) => artist.id === id);
    const updatedArtist: Artist = {
      ...oldArtist,
      ...artist,
    };

    this.data.artist = this.data.artist.map((artist) => {
      if (artist.id === id) return updatedArtist;
      return artist;
    });

    return updatedArtist;
  }

  deleteArtist(id: Artist['id']) {
    const deletedArtistIdx = this.data.artist.findIndex(
      (artist) => artist.id === id,
    );
    if (deletedArtistIdx !== -1) {
      const deletedArtist = this.data.artist.splice(deletedArtistIdx, 1);
      //delete from favorites
      if (this.findOneFavorite(id, 'artists')) this.deleteFavoriteArtist(id);
      //delete from albums put null
      this.data.album = this.data.album.map((album) => {
        if (album.artistId === id) return { ...album, artistId: null };
        return album;
      });
      //delete from tracks put null
      this.data.track = this.data.track.map((track) => {
        if (track.artistId === id) return { ...track, artistId: null };
        return track;
      });
      return deletedArtist;
    }
    return null;
  }

  // *** Album ***
  createAlbum(createAlbumDto: CreateAlbumDto): Partial<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.data.album.push(newAlbum);
    return newAlbum;
  }

  findAllAlbums() {
    return this.data.album;
  }

  findOneAlbum(id: Album['id']) {
    return this.data.album.find((album) => album.id === id) || null;
  }

  updateAlbum(id: Album['id'], album: Partial<Album>) {
    const oldAlbum = this.data.album.find((album) => album.id === id);

    const updatedAlbum: Album = {
      ...oldAlbum,
      ...album,
    };

    this.data.album = this.data.album.map((album) => {
      if (album.id === id) return updatedAlbum;
      return album;
    });

    return updatedAlbum;
  }

  deleteAlbum(id: Album['id']) {
    const deletedAlbumIdx = this.data.album.findIndex(
      (album) => album.id === id,
    );
    if (deletedAlbumIdx !== -1) {
      console.log(`database.service.ts - line: 224 ->> DELETE ALBUM`);
      const deletedAlbum = this.data.album.splice(deletedAlbumIdx, 1);
      //delete from favorite
      if (this.findOneFavorite(id, 'albums')) this.deleteFavoriteAlbum(id);
      //delete from tracks
      this.data.track = this.data.track.map((track) => {
        if (track.albumId === id) {
          console.log(`database.service.ts - line: 233 ->> `, this.data.track);
          return { ...track, albumId: null };
        }
        return track;
      });
      return deletedAlbum;
    }
    return null;
  }

  // *** Track ***
  createTrack(createTrackDto: CreateTrackDto): Partial<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.data.track.push(newTrack);

    return newTrack;
  }

  findAllTracks() {
    return this.data.track;
  }

  findOneTrack(id: Track['id']) {
    return this.data.track.find((track) => track.id === id) || null;
  }

  updateTrack(id: Track['id'], album: Partial<Track>) {
    const oldTrack = this.data.track.find((track) => track.id === id);

    const findTrackArtistId: string | null =
      this.data.artist.find((artist) => artist.name === album.artistId)?.id ||
      null;

    const findTrackAlbumId: string | null =
      this.data.album.find((albumData) => albumData.name === album.albumId)
        ?.id || null;

    const updatedAlbum: Track = {
      ...oldTrack,
      ...album,
      artistId: findTrackArtistId,
      albumId: findTrackAlbumId,
    };

    this.data.track = this.data.track.map((track) => {
      if (track.id === id) return updatedAlbum;
      return track;
    });

    return updatedAlbum;
  }

  deleteTrack(id: Track['id']) {
    const deletedTrackIdx = this.data.track.findIndex(
      (track) => track.id === id,
    );
    if (deletedTrackIdx !== -1) {
      const deletedTrack = this.data.track.splice(deletedTrackIdx, 1);
      if (this.findOneFavorite(id, 'tracks')) this.deleteFavoriteTrack(id);
      return deletedTrack;
    }
    return null;
  }

  // *** Favorites ***
  findAllFavorite() {
    const favouriteArtistsIds = this.data.favorites.artists.map(
      (artist) => artist.id,
    );

    const favouriteArtists = this.data.artist.filter((artist) =>
      favouriteArtistsIds.includes(artist.id),
    );

    const favouriteAlbumsIds = this.data.favorites.albums.map(
      (album) => album.id,
    );

    const favouriteAlbums = this.data.album.filter((album) =>
      favouriteAlbumsIds.includes(album.id),
    );

    const favouriteTracksIds = this.data.favorites.tracks.map(
      (track) => track.id,
    );

    const favouriteTracks = this.data.track.filter((track) =>
      favouriteTracksIds.includes(track.id),
    );

    const userFavorites = {
      artists: [...favouriteArtists],
      albums: [...favouriteAlbums],
      tracks: [...favouriteTracks],
    };

    return userFavorites;
  }

  createFavoriteArtist(id: Artist['id']) {
    this.data.favorites.artists.push({ id });
    return this.data.favorites;
  }

  createFavoriteAlbum(id: Album['id']) {
    this.data.favorites.albums.push({ id });
    return this.data.favorites;
  }

  createFavoriteTrack(id: Track['id']) {
    this.data.favorites.tracks.push({ id });
    return this.data.favorites;
  }

  //delete
  findOneFavorite(id: string, favorite: keyof Fav) {
    const findFavorite = this.data.favorites[favorite].find(
      (favorite) => favorite.id === id,
    );
    return findFavorite;
  }

  deleteFavoriteArtist(id: Artist['id']) {
    const findFavoriteArtistIdx = this.data.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    return this.data.favorites.artists.splice(findFavoriteArtistIdx, 1);
  }

  deleteFavoriteAlbum(id: Album['id']) {
    const findFavoriteAlbumIdx = this.data.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    return this.data.favorites.albums.splice(findFavoriteAlbumIdx, 1);
  }

  deleteFavoriteTrack(id: Track['id']) {
    const findFavoriteAlbumIdx = this.data.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    return this.data.favorites.tracks.splice(findFavoriteAlbumIdx, 1);
  }
}
