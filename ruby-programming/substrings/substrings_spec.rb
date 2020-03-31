load 'substrings.rb'

RSpec.describe Substring do
  ss = Substring.new

  context "#substrings" do
    dictionary = ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"]
    words = "Howdy partner, sit down! How's it going?" 
    it "returns a hash listing each substring and the number of matches" do
      expect(ss.substrings(words, dictionary)).to eq({"down"=>1,"how"=>2,"howdy"=>1,"go"=>1,"going"=>1,"it"=>2,"i"=>3,"own"=>1,"part"=>1,"partner"=>1,"sit"=>1})
    end
  end

end
