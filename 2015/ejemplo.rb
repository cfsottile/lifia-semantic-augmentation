class Getter
  @url_fija
  @bloque_a_ejecutar
  @url_variable
  def initialize url_fija, bloque
    @url_fija = url_fija
    @bloque = bloque
  def get parte_variable
    # hace
  end
end

locationsGetter = Getter "imdb.com" {|s| puts s}
locationsGetter.get
