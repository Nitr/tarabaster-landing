require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  erb :index
end

post '/order' do
  mg_client = Mailgun::Client.new 'key-34f2060ddee3b2f97545b4b1abcb7229'

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
