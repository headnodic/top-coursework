load 'stock_picker.rb'

RSpec.describe StockPicker do
  sp = StockPicker.new

  context "#stock_picker" do
    it "returns a pair of days to buy and sell" do
      prices = [17,3,6,9,15,8,6,1,10]
      expect(sp.stock_picker(prices)).to eq([1,4])
    end
  end

end
