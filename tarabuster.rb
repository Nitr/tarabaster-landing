require 'sinatra'
require 'sinatra/reloader' if development?
require 'slim'
require 'mailgun'

set :phone_number_8, '8 800 551-17-06'
set :phone_number_7, '+78005511706'
set :info_email, 'info@tarabuster.ru'

get '/' do
  slim :bugs
end
get '/ants(.:format)?' do
  slim :ants
end
get '/bugs(.:format)?' do
  slim :bugs
end
get '/cocroaches(.:format)?' do
  slim :cocroaches
end
get '/moles(.:format)?' do
  slim :moles
end
get '/mosquitos(.:format)?' do
  slim :mosquitos
end
get '/rats(.:format)?' do
  slim :rats
end
get '/rodents(.:format)?' do
  slim :rodents
end
get '/ticks(.:format)?' do
  slim :ticks
end

post '/order' do
  mg_client = Mailgun::Client.new ENV.fetch('mailgun_key')

  text = params[:lines].values.map{|line| "#{line[:name]}: #{line[:value]}" }.join("\n\n")
  message_params =  {
    from: 'info@tarabuster.ru',
    to: 'info@tarabuster.ru',
    subject: 'Новый Заказ',
    text:    text
  }

  mg_client.send_message 'mg.tarabuster.ru', message_params

  { result: 'ok' }.to_json
end
