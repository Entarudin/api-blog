export interface IBaseCRUDRepository<TModel, TCreateDto, TUpdateDto> {
  create(dto: TCreateDto): Promise<TModel>;
  update(id: string, dto: TUpdateDto): Promise<TModel>;
  delete(id: string): Promise<void>;
  findAll(): Promise<TModel[]>;
  findById(id: string): Promise<TModel>;
}
