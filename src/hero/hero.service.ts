import { Injectable } from '@nestjs/common';
import { Hero } from './interfaces/hero.interface'

@Injectable()
export class HeroesService {
  private readonly heroes: Hero[] =  [
    {
      id: 1,
      name: "Yuzhong",
      type: "fighter",
      image: "yuzhong.png"
    },
    {
      id: 2,
      name: "Vexana",
      type: "mage",
      image: "vexana.png"
    },
    {
      id: 3,
      name: "Lancelot",
      type: "assasin",
      image: "lancelot.png"
    },
    {
      id: 4,
      name: "Tigreal",
      type: "tank",
      image: "tigreal.png"
    }
  ];

  create(hero: Hero) {
    this.heroes.push(hero);
  }

  findAll(): Hero[] {
    return this.heroes;
  }
}