import { Body, Controller, Delete, Get, Header, HttpCode, NotFoundException, Param, Post, Put, Redirect, Req, Res } from "@nestjs/common";
import { response } from "express";
import { CreateHeroDto, UpdateHeroDto } from "./dto/create-hero.dto";
import { HeroesService } from "./hero.service";

let heroes = [
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
]

@Controller("hero")
export class HeroController {
  constructor(private heroesService: HeroesService) {}

  @Get("index")
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  index(@Res() res) {
    res.json(this.heroesService.findAll())
  }

  @Get(":id")
  show(@Param("id") id: string, @Res() res) {
    const heroId = parseInt(id, 10);
    const hero = heroes.find(h => h.id === heroId);

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    res.json(hero);
  }

  @Get("create")
  create(@Res({ passthrough: true }) res): string {
    res.cookie('name', 'tobi')
    return "hero create"
  }

  @Post("store")
  store(@Req() req, @Body() CreateHeroDto: CreateHeroDto, @Res() res) {
    try {
      const { id, name, type, image } = req.body
      this.heroesService.create({ id, name, type, image })
      res.status(201).json(CreateHeroDto)

    } catch (error) {
      res.status(500).json({ message: "Ada kendala di server" })
    }
  }

  @Put("update/:id")
  update(@Param("id") id: number, @Body() updateHeroDto: UpdateHeroDto, @Res() res) {
    const hero = this.heroesService.findAll().find(hero => hero.id == id);

    if (!hero) {
      return res.status(404).json({ message: `Hero with ID ${id} not found` });
    }

    if (updateHeroDto.name) {
      hero.name = updateHeroDto.name;
    }

    if (updateHeroDto.type) {
      hero.type = updateHeroDto.type;
    }

    if (updateHeroDto.image !== undefined) {
      hero.image = updateHeroDto.image;
    }

    res.status(200).json(this.heroesService.findAll());
  }

  @Delete(":id")
  destroy(@Param("id") id: string, @Res() res) {
    const heroId = parseInt(id, 10);
    const hero = this.heroesService.findAll().filter(h => h.id != heroId);

    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }

    res.json(hero);
  }

  @Get("welcome")
  @Redirect("https://docs.nestjs.com", 301)
  hello() {
    return "Welcome"
  }
}