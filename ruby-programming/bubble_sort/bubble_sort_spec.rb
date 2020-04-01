load 'bubble_sort.rb'

RSpec.describe BubbleSort do
  bs = BubbleSort.new

  context "#bubble_sort" do
    it "returns a sorted array" do
      a = [4,3,78,2,0,2]
      b = [0,2,2,3,4,78]
      expect(bs.bubble_sort(a)).to eq(b)
    end
  end

  context "#bubble_sort_by" do
    it "sorts an array with a block" do
      a = bs.bubble_sort_by(["hi","hello","hey"]) do |l,r|
        l.length - r.length
      end
      b = ["hi","hey","hello"]
      expect(a).to eq(b)
    end
  end

end
